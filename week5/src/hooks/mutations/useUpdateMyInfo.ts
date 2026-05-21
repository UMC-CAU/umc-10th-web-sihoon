import { useMutation } from "@tanstack/react-query";
import { updateMyInfo } from "../../apis/auth";
import { queryClient } from "../../App";

function useUpdateMyInfo() {
    return useMutation({
        mutationFn: updateMyInfo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myInfo"] });
        },
    });
}

export default useUpdateMyInfo;
