import axios, { AxiosError,type InternalAxiosRequestConfig } from "axios";
import {toast} from "react-toastify";

// const API_BASE_URL = "http://localhost:5000/api/v1";
const API_BASE_URL = "https://15-207-116-19.nip.io/api/v1"

const REFRESH_TOKEN_URL = `${API_BASE_URL}/auth/refresh-token`;

const api = axios.create({
  baseURL: API_BASE_URL,
});

const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

const logoutAndRedirect = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  toast.error("Session expired. Please log in again.");
  window.location.href = "/signin";
};

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
  config: InternalAxiosRequestConfig;
}[] = [];

const processQueue = (error: AxiosError | null, newAccessToken: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      if (prom.config.headers) {
        prom.config.headers.Authorization = `Bearer ${newAccessToken}`;
      }
      prom.resolve(api(prom.config));
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,

  async (error: AxiosError) => {
    const originalRequest: InternalAxiosRequestConfig & { _retry?: boolean } = error.config!;
    const status = error.response?.status;

    if (status !== 401) {
      const msg =
        (error.response?.data as any)?.message ||
        error.message ||
        "Something went wrong";
      toast.error(msg);
      return Promise.reject(error);
    }

    if (
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/signup")
    ) {
      return Promise.reject(error);   // Wrong credentials → don't refresh
    }
    // if (originalRequest.url?.includes("/auth/refresh-token")) {
    //   logoutAndRedirect();
    //   return Promise.reject(error);
    // }

    // if (originalRequest._retry) {
    //   logoutAndRedirect();
    //   return Promise.reject(error);
    // }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        originalRequest._retry = true;
        failedQueue.push({ resolve, reject, config: originalRequest });
      });
    }

    isRefreshing = true;
    originalRequest._retry = true;

    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) throw new Error("No refresh token available.");

      const response = await axios.post(REFRESH_TOKEN_URL, { refreshToken });

      if (!response.data?.accessToken) {
        throw new Error("Invalid refresh token response");
      }

      const newAccessToken = response.data.accessToken;
      // const newRefreshToken = response.data.refreshToken;

      localStorage.setItem("accessToken", newAccessToken);
      // localStorage.setItem("refreshToken", newRefreshToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      processQueue(null, newAccessToken);
      isRefreshing = false;

      return api(originalRequest);
    } catch (refreshError: any) {
      processQueue(refreshError);
      isRefreshing = false;
      logoutAndRedirect();
      return Promise.reject(refreshError);
    }
  }
);

export default api;
