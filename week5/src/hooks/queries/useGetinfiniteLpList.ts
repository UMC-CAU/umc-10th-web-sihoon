import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";

function useGetInfiniteLpList(limit: number, search?: string, order?: "asc" | "desc") {
    return useInfiniteQuery({
        queryKey: ["lps", search, order],
        queryFn: ({ pageParam }) => getLpList({ cursor: pageParam, search, order, limit }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.data.hasNext) {
                return lastPage.data.nextCursor;
            }
            return undefined;
        },
    });
}

export default useGetInfiniteLpList;
