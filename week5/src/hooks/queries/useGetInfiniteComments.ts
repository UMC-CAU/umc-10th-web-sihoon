import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/lp";

function useGetInfiniteComments(lpId: number, order: "asc" | "desc") {
    return useInfiniteQuery({
        queryKey: ["lpComments", lpId, order],
        queryFn: ({ pageParam }) => getComments(lpId, { cursor: pageParam, limit: 10, order }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.data.hasNext) {
                return lastPage.data.nextCursor;
            }
            return undefined;
        },
    });
}

export default useGetInfiniteComments;
