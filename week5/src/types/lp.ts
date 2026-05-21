import type { CommonResponse } from "./common.ts";

export type Tag = {
    id: number;
    name: string;
};

export type Likes = {
    id: number;
    userId: number;
    lpId: number;
};

export type Lp = {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
    likes: Likes[];
};

export type Comment = {
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    author: {
        id: number;
        name: string;
        avatar: string | null;
    };
};

export type ResponseLpListDto = CommonResponse<{
    data: Lp[];
    nextCursor: number;
    hasNext: boolean;
}>;

export type ResponseLpDetailDto = CommonResponse<Lp>;

export type ResponseCommentListDto = CommonResponse<{
    data: Comment[];
    nextCursor: number;
    hasNext: boolean;
}>;

export type RequestLpDto = { lpid: number; };

export type RequestCreateLpDto = {
    title: string;
    content: string;
    thumbnail?: string;
    tags: string[];
    published: boolean;
};

export type RequestUpdateLpDto = Partial<RequestCreateLpDto>;

export type ResponseLikeLpDto = CommonResponse<{
    id:number;
    userId:number;
    lpId:number;
}>; 
