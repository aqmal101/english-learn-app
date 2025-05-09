// src/context/AuthContext.jsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import api from "../lib/api";

const AuthContext = createContext({
  user: null,
  authLoading: true,
  authError: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  clearAuthError: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const clearAuthError = useCallback(() => {
    setAuthError(null);
  }, []);

  const fetchUser = useCallback(async () => {
    setAuthLoading(true);
    try {
      const res = await api.get("/api/v1/auth/profile");
      setUser(res.data);
      setAuthError(null);
    } catch (err) {
      setUser(null);
      if (err.response && err.response.status !== 401) {
        setAuthError(
          err.response?.data?.message || "Failed to fetch user data"
        );
      }
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email, password) => {
      setAuthLoading(true);
      clearAuthError();

      try {
        await api.get("/sanctum/csrf-cookie");
        await api.post("/api/v1/auth/login", { email, password });
        await fetchUser(); // Ini penting, harus return user
        return true;
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Login failed. Please check your credentials.";

        setAuthError(errorMessage);
        setAuthLoading(false);
        throw error;
      }
    },
    [fetchUser, clearAuthError]
  );

  const register = useCallback(
    async (userData) => {
      setAuthLoading(true);
      clearAuthError();
      try {
        await api.get("/sanctum/csrf-cookie");
        await api.post("/api/v1/auth/register", userData);
        await fetchUser();
        return true;
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Registration failed. Please try again.";

        setAuthError(errorMessage);
        setAuthLoading(false);
        throw error;
      }
    },
    [fetchUser, clearAuthError]
  );

  const logout = useCallback(async () => {
    setAuthLoading(true);
    clearAuthError();
    try {
      await api.post("/api/v1/auth/logout");
      setUser(null);
    } catch (error) {
      setAuthError(error.response?.data?.message || "Logout failed");
    } finally {
      setAuthLoading(false);
    }
  }, [clearAuthError]);

  useEffect(() => {
    fetchUser();
    const interceptor = api.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response?.status === 401) {
          setUser(null);
        }
        return Promise.reject(error);
      }
    );
    return () => api.interceptors.response.eject(interceptor);
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        authError,
        login,
        logout,
        register,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
