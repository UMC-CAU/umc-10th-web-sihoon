import type { PaginationDto } from "../types/common";
import type { ResponseCommentListDto, ResponseLpDetailDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
    const { data } = await axiosInstance.get("/v1/lps", { params: paginationDto });
    return data;
};

export const getLpDetail = async (lpId: number): Promise<ResponseLpDetailDto> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
    return data;
};

export const getComments = async (
    lpId: number,
    paginationDto: PaginationDto
): Promise<ResponseCommentListDto> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, { params: paginationDto });
    return data;
};

export const createComment = async (lpId: number, content: string) => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, { content });
    return data;
};
