import axios from "axios";
import { API_BASE_URL } from "../global-config";
import { AxiosInstance } from 'axios';


// Loading variable
let activeRequests = 0;
let setLoading = (isLoading: boolean) => { };

// Function to configure the loading state management
export const configureLoading = (loadingSetter: (isLoading: boolean) => void) => {
    setLoading = loadingSetter;
};

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        activeRequests++;
        if (setLoading) {
            setLoading(true);
        }
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        activeRequests--;
        if (activeRequests === 0 && setLoading) {
            setLoading(false);
        }
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        activeRequests--;
        if (activeRequests === 0 && setLoading) {
            setLoading(false);
        }
        return response;
    },
    (error) => {
        activeRequests--;
        if (activeRequests === 0 && setLoading) {
            setLoading(false);
        }
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;