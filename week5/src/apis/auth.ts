import type { RequestSignupDto, ResponseSignupDto, RequestSigninDto, ResponseSigninDto, ResponseMyInfoDto } from "../types/auth";
import { axiosInstance } from "./axios";

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
