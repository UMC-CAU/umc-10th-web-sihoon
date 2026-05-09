import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import LpCard from "../components/LpCard";

const HomePage = () => {
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState<"asc" | "desc">("desc");

    const { data, isPending, isError, refetch } = useGetLpList({ search, order });

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
                <div className="flex justify-center items-center mt-20">
                    <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}

        
            {isError && (
                <div className="flex flex-col items-center gap-4 mt-20 text-gray-400">
                    <p>데이터 로딩 실패.</p>
                    <button
                        onClick={() => refetch()}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        다시시도
                    </button>
                </div>
            )}

            
            {!isPending && !isError && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {data?.data.map((lp) => (
                        <LpCard
                            key={lp.id}
                            id={lp.id}
                            title={lp.title}
                            thumbnail={lp.thumbnail}
                            createdAt={lp.createdAt}
                            likesCount={lp.likes.length}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
