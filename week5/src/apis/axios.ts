import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
        const accessToken = raw ? JSON.parse(raw) : null;

        if (accessToken) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest: CustomInternalAxiosRequestConfig = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            // 리프레시 요청 자체가 401이면 → 토큰 삭제 후 로그인 이동
            if (originalRequest.url === "/v1/auth/refresh") {
                localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
                localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
                window.location.href = "/login";
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            // 이미 리프레시 요청이 진행중이면 그 promise를 재사용
            if (!refreshPromise) {
                refreshPromise = (async () => {
                    const raw = localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);
                    const refreshToken = raw ? JSON.parse(raw) : null;

                    const response = await axiosInstance.post("/v1/auth/refresh", { refreshToken });
                    const newAccessToken = response.data.data.accessToken;

                    localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, JSON.stringify(newAccessToken));
                    return newAccessToken;
                })().finally(() => {
                    refreshPromise = null;
                });
            }

            try {
                // 리프레시 성공 → 새 accessToken으로 헤더 교체 후 원래 요청 재시도
                const newAccessToken = await refreshPromise;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch {
                // 리프레시 실패 → 토큰 전부 삭제하고 로그인 페이지로 강제 이동
                localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
                localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
