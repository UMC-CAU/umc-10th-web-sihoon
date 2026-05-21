import type { PaginationDto } from "../types/common";
import type { RequestCreateLpDto, RequestUpdateLpDto, ResponseCommentListDto, ResponseLikeLpDto, ResponseLpDetailDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
    const { data } = await axiosInstance.get("/v1/lps", { params: paginationDto });
    return data;
};

export const getLpDetail = async (lpId: number): Promise<ResponseLpDetailDto> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
    return data;
};

export const createLp = async (body: RequestCreateLpDto) => {
    const { data } = await axiosInstance.post("/v1/lps", body);
    return data;
};

export const updateLp = async ({ lpId, body }: { lpId: number; body: RequestUpdateLpDto }) => {
    const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, body);
    return data;
};

export const deleteLp = async (lpId: number) => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
    return data;
};

export const getComments = async (lpId: number, paginationDto: PaginationDto): Promise<ResponseCommentListDto> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, { params: paginationDto });
    return data;
};

export const createComment = async ({ lpId, content }: { lpId: number; content: string }) => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, { content });
    return data;
};

export const updateComment = async ({ lpId, commentId, content }: { lpId: number; commentId: number; content: string }) => {
    const { data } = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, { content });
    return data;
};

export const deleteComment = async ({ lpId, commentId }: { lpId: number; commentId: number }) => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
    return data;
};

export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await axiosInstance.post("/v1/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data.data.url;
};

export const postlike = async (lpId: number): Promise<ResponseLikeLpDto> => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
    return data;
};

export const deletelike = async (lpId: number): Promise<ResponseLikeLpDto> => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
    return data;
};
