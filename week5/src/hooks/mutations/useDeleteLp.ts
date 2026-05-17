import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";
import { queryClient } from "../../App";

function useDeleteLp() {
    return useMutation({
        mutationFn: deleteLp,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["lps"] });
        },
    });
}

export default useDeleteLp;
