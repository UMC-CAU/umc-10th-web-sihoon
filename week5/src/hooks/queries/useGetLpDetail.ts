import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";

function useGetLpDetail(lpId: number) {
    return useQuery({
        queryKey: ["lp", lpId],
        queryFn: () => getLpDetail(lpId),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        select: (data) => data.data,
    });
}

export default useGetLpDetail;
