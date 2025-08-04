import axiosInstance from "../utils/axiosInstance"

export const getAllAgents =async () => {
    const response = await axiosInstance.get('/users/agents/')
        .then(res => res?.data?.data)
        .catch(err => err);

        return response;
}

