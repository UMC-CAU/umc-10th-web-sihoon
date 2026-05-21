import axios from "axios";
import type { RequestSignupDto, ResponseSignupDto, RequestSigninDto, ResponseSigninDto, ResponseMyInfoDto } from "../types/auth";

// axios 인스턴스 생성 (baseURL, 기본 헤더 설정)
const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

// 요청 인터셉터: 모든 요청 전에 토큰을 헤더에 자동으로 추가
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 회원가입 API
export const signup = async (data: RequestSignupDto): Promise<ResponseSignupDto> => {
    const response = await axiosInstance.post("/v1/auth/signup", data);
    return response.data;
};

// 로그인 API
export const signin = async (data: RequestSigninDto): Promise<ResponseSigninDto> => {
    const response = await axiosInstance.post("/v1/auth/signin", data);
    return response.data;
};

// 내 정보 조회 API (토큰 필요)
export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
    const response = await axiosInstance.get("/v1/users/me");
    return response.data;
};
