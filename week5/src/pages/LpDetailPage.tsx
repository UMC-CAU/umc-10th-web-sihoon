import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../apis/lp";
import { getMyInfo } from "../apis/auth";
import useGetInfiniteComments from "../hooks/queries/useGetInfiniteComments";
import useCreateComment from "../hooks/mutations/useCreateComment";
import useUpdateComment from "../hooks/mutations/useUpdateComment";
import useDeleteComment from "../hooks/mutations/useDeleteComment";
import useDeleteLp from "../hooks/mutations/useDeleteLp";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import { useAuth } from "../context/AuthContext";

const LpDetailPage = () => {
    const { lpId } = useParams();
    const navigate = useNavigate();
    const { accessToken } = useAuth();
    const id = Number(lpId);

    const [commentOrder, setCommentOrder] = useState<"asc" | "desc">("desc");
    const [commentInput, setCommentInput] = useState("");
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editingContent, setEditingContent] = useState("");
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ["lp", id],
        queryFn: () => getLpDetail(id),
        select: (res) => res.data,
    });

    const { data: commentData, fetchNextPage, hasNextPage } =
        useGetInfiniteComments(id, commentOrder);

    const comments = commentData?.pages.flatMap((page) => page.data.data) ?? [];

    const { mutate: createComment, isPending: isCreating } = useCreateComment(id);
    const { mutate: updateComment } = useUpdateComment(id);
    const { mutate: deleteComment } = useDeleteComment(id);
    const { mutate: deleteLp } = useDeleteLp();
    const { mutate: postLike } = usePostLike();
    const { mutate: deleteLike } = useDeleteLike();

    const { data: myInfo } = useQuery({
        queryKey: ["myInfo"],
        queryFn: getMyInfo,
        select: (res) => res.data,
        enabled: !!accessToken,
    });

    const isLiked = !!(myInfo && data?.likes.some((like) => like.userId === myInfo.id));

    const handleLikeToggle = () => {
        if (isLiked) {
            deleteLike(data?.id as any, { onSuccess: () => refetch() });
        } else {
            postLike(data?.id as any, { onSuccess: () => refetch() });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && hasNextPage) fetchNextPage();
        });
        if (bottomRef.current) observer.observe(bottomRef.current);
        return () => observer.disconnect();
    }, [hasNextPage, fetchNextPage]);

    const handleDeleteLp = () => {
        if (!confirm("LP를 삭제하시겠습니까?")) return;
        deleteLp(id, { onSuccess: () => navigate("/") });
    };

    const handleCommentSubmit = () => {
        if (!commentInput.trim()) return;
        createComment(commentInput, { onSuccess: () => setCommentInput("") });
    };

    const handleEditSave = (commentId: number) => {
        updateComment({ commentId, content: editingContent }, {
            onSuccess: () => setEditingCommentId(null),
        });
    };

    if (isPending) {
        return (
            <div className="flex justify-center items-center mt-20">
                <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center gap-4 mt-20 text-gray-400">
                <p>데이터 로딩 실패.</p>
                <button onClick={() => refetch()} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                    다시시도
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 text-white">
            <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white mb-6 transition-colors">← 뒤로</button>

            <img src={data?.thumbnail} alt={data?.title} className="w-full aspect-square object-cover rounded-xl mb-6" />
            <h1 className="text-2xl font-bold mb-2">{data?.title}</h1>

            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <span>{new Date(data?.createdAt ?? "").toLocaleDateString("ko-KR")}</span>
                <span className="text-pink-400">♥ {data?.likes.length}</span>
            </div>

            {data?.tags.length ? (
                <div className="flex gap-2 flex-wrap mb-4">
                    {data.tags.map((tag) => (
                        <span key={tag.id} className="bg-gray-700 px-3 py-1 rounded-full text-xs">#{tag.name}</span>
                    ))}
                </div>
            ) : null}

            <p className="text-gray-300 leading-relaxed whitespace-pre-line mb-8">{data?.content}</p>

            <div className="flex gap-3 mb-10">
                {accessToken && (
                    <button onClick={handleDeleteLp} className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg transition-colors">삭제</button>
                )}
                <button onClick={handleLikeToggle} className={`px-5 py-2 rounded-lg transition-colors ${isLiked ? "bg-pink-800 hover:bg-pink-900" : "bg-pink-600 hover:bg-pink-700"}`}>
                    {isLiked ? "♥ 좋아요 취소" : "♥ 좋아요"}
                </button>
            </div>

            
            <div className="border-t border-gray-700 pt-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">댓글</h2>
                    <button
                        onClick={() => setCommentOrder(commentOrder === "desc" ? "asc" : "desc")}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        {commentOrder === "desc" ? "최신순" : "오래된순"}
                    </button>
                </div>

               
                <div className="flex gap-2 mb-6">
                    <input
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="댓글을 입력하세요"
                        className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-sm outline-none focus:border-purple-500"
                    />
                    <button
                        onClick={handleCommentSubmit}
                        disabled={isCreating || !commentInput.trim()}
                        className="bg-purple-600 hover:bg-purple-700 disabled:opacity-40 px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                        등록
                    </button>
                </div>

                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3 bg-gray-900 rounded-lg p-3">
                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs shrink-0">
                                {comment.author.name[0]}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">{comment.author.name}</p>
                                {editingCommentId === comment.id ? (
                                    <div className="flex gap-2 mt-1">
                                        <input
                                            value={editingContent}
                                            onChange={(e) => setEditingContent(e.target.value)}
                                            className="flex-1 bg-gray-700 rounded px-2 py-1 text-sm outline-none"
                                        />
                                        <button onClick={() => handleEditSave(comment.id)} className="text-purple-400 text-sm">저장</button>
                                        <button onClick={() => setEditingCommentId(null)} className="text-gray-400 text-sm">취소</button>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-300 mt-0.5">{comment.content}</p>
                                )}
                            </div>

                            {accessToken && (
                                <div className="relative">
                                    <button
                                        onClick={() => setOpenMenuId(openMenuId === comment.id ? null : comment.id)}
                                        className="text-gray-400 hover:text-white px-1"
                                    >
                                        ···
                                    </button>
                                    {openMenuId === comment.id && (
                                        <div className="absolute right-0 top-6 bg-gray-700 rounded-lg shadow-lg z-10 w-20 overflow-hidden">
                                            <button
                                                onClick={() => {
                                                    setEditingCommentId(comment.id);
                                                    setEditingContent(comment.content);
                                                    setOpenMenuId(null);
                                                }}
                                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-600"
                                            >
                                                수정
                                            </button>
                                            <button
                                                onClick={() => {
                                                    deleteComment(comment.id);
                                                    setOpenMenuId(null);
                                                }}
                                                className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-600"
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={bottomRef} className="h-4" />
                </div>
            </div>
        </div>
    );
};

export default LpDetailPage;
