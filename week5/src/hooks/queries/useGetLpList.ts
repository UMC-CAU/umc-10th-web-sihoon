import { useQuery } from "@tanstack/react-query"
import { getLpList } from "../../apis/lp.ts"
import type { PaginationDto } from "../../types/common.ts";


function useGetLpList({cursor,search,order,limit}:PaginationDto){
    return useQuery({
        queryKey:["lps", search, order],
        queryFn:()=>getLpList({cursor,search,order,limit}),
        staleTime: 1000 * 60 * 5, // 5분
        gcTime: 1000 * 60 * 10, // 10분

        select:(data) =>data.data,
    })
}

export default useGetLpList;