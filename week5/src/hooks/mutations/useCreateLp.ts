import { useMutation } from "@tanstack/react-query";
import { createLp } from "../../apis/lp";
import { queryClient } from "../../App";

function useCreateLp() {
    return useMutation({
        mutationFn: createLp,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["lps"] });
        },
    });
}

export default useCreateLp;
