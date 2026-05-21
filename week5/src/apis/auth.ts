import type { RequestSignupDto, ResponseSignupDto, RequestSigninDto, ResponseSigninDto, ResponseMyInfoDto } from "../types/auth";
import { axiosInstance } from "./axios";

export const signup = async (data: RequestSignupDto): Promise<ResponseSignupDto> => {
    const response = await axiosInstance.post("/v1/auth/signup", data);
    return response.data;
};

export const signin = async (data: RequestSigninDto): Promise<ResponseSigninDto> => {
    const response = await axiosInstance.post("/v1/auth/signin", data);
    return response.data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
    const response = await axiosInstance.get("/v1/users/me");
    return response.data;
};

export const signout = async () => {
    const response = await axiosInstance.post("/v1/auth/signout");
    return response.data;
};

export const deleteAccount = async () => {
    const response = await axiosInstance.delete("/v1/users");
    return response.data;
};

export const updateMyInfo = async (data: { name?: string; bio?: string; avatar?: string }) => {
    const response = await axiosInstance.patch("/v1/users", data);
    return response.data;
};
