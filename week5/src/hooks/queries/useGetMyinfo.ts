import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../../apis/auth";

function useGetMyinfo(accessToken:string|null) {   
    return useQuery ( {
        queryKey: ["myinfo"],
        queryFn:getMyInfo,
        enabled:!!accessToken,
    });
}

export default useGetMyinfo;