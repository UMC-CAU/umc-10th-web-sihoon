import { useState, useEffect, useRef } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetinfiniteLpList";
import LpCard from "../components/LpCard";
import LpCardSkeleton from "../components/LpCardSkeleton";
import LpCreateModal from "../components/LpCreateModal";
import useDebounce from "../hooks/queries/useDebounce";

const HomePage = () => {
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const debouncedSearch = useDebounce(search, 300);

    const { data, isPending, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useGetInfiniteLpList(10, debouncedSearch, order);

    const lps = data?.pages.flatMap((page) => page.data.data) ?? [];

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && hasNextPage) fetchNextPage();
        });
        if (bottomRef.current) observer.observe(bottomRef.current);
        return () => observer.disconnect();
    }, [hasNextPage, fetchNextPage]);

    return (
        <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="검색어 입력"
                    className="border border-gray-600 bg-gray-800 text-white rounded-lg px-4 py-2 flex-1 outline-none focus:border-purple-500"
                />
                <button
                    onClick={() => setOrder(order === "desc" ? "asc" : "desc")}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                >
                    {order === "desc" ? "최신순" : "오래된순"}
                </button>
            </div>

            {isPending && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <LpCardSkeleton key={i} />)}
                </div>
            )}

            {isError && (
                <div className="flex flex-col items-center gap-4 mt-20 text-gray-400">
                    <p>데이터 로딩 실패.</p>
                    <button onClick={() => refetch()} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                        다시시도
                    </button>
                </div>
            )}

            {!isPending && !isError && (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {lps.map((lp) => (
                            <LpCard key={lp.id} id={lp.id} title={lp.title} thumbnail={lp.thumbnail} createdAt={lp.createdAt} likesCount={lp.likes.length} />
                        ))}
                    </div>

                    <div ref={bottomRef} className="h-4" />

                    {(isFetchingNextPage || hasNextPage) && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <LpCardSkeleton key={i} />)}
                        </div>
                    )}
                </>
            )}

            {/* LP 작성 플로팅 버튼 */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-8 right-8 w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white text-3xl rounded-full shadow-lg transition-colors flex items-center justify-center"
            >
                +
            </button>

            {isModalOpen && <LpCreateModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default HomePage;
