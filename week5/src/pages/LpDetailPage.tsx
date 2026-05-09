import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useGetInfiniteComments from "../hooks/queries/useGetInfiniteComments";

const LpDetailPage = () => {
    const { lpId } = useParams();
    const navigate = useNavigate();
    const [commentOrder, setCommentOrder] = useState<"asc" | "desc">("desc");
    const bottomRef = useRef<HTMLDivElement>(null);

    const { data, isPending, isError, refetch } = useGetLpDetail(Number(lpId));
    const { data: commentData, fetchNextPage, hasNextPage } =
        useGetInfiniteComments(Number(lpId), commentOrder);

    const comments = commentData?.pages.flatMap((page) => page.data.data) ?? [];

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && hasNextPage) fetchNextPage();
        });
        if (bottomRef.current) observer.observe(bottomRef.current);
        return () => observer.disconnect();
    }, [hasNextPage, fetchNextPage]);

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

            <p className="text-gray-900 leading-relaxed whitespace-pre-line mb-8">{data?.content}</p>


    
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

                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3 bg-gray-900 rounded-lg p-3">
                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs shrink-0">
                                {comment.author.name[0]}
                            </div>
                            <div>
                                <p className="text-sm font-medium">{comment.author.name}</p>
                                <p className="text-sm text-gray-300 mt-0.5">{comment.content}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={bottomRef} className="h-4" />
                </div>
            </div>
        </div>
    );
};

export default LpDetailPage;
