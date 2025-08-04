import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "../global-config";
import { TypeLogUser, TypeUser } from "../types/user";
// -----------------------------------------
type TypeAuthProviderProps = {
  children: React.ReactNode;
};
// -----------------------------------------
const AuthContext = createContext<{
  user: TypeUser | null;
  token: string | null;
  loading: boolean;
  login: (userData: TypeLogUser) => Promise<void>;
  logout: () => void;
  fetchUserData: () => Promise<void>;
}>({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  fetchUserData: async () => {},
});
export const AuthProvider: React.FC<TypeAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<TypeUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize auth state from local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      validateToken(storedToken);
    } else {
      setLoading(false); // No token, stop loading
    }
  }, []);

  const validateToken = async (token: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/account`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setToken(token);
        setUser(response.data.user);
      } else {
        logout(); // Token invalid or expired
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData: TypeLogUser) => {
    try {
      const result = await axios.post(`${API_BASE_URL}/auth/admin`, userData);

      if (result.data.success) {
        const { data: user, payload: token } = result.data;
        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
      } else {
        throw new Error(result.data.error);
      }
    } catch (error: any) {
      throw error?.response?.data?.error || error?.message;
    }
  };

  const fetchUserData = async () => {
    try {
      const result = await axios.get(`${API_BASE_URL}/auth/account`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(result.data.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    fetchUserData,
  };
  

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const UserAuth = useContext(AuthContext);
  if (!UserAuth) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return UserAuth;
};
