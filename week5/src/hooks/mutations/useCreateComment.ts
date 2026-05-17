import { useMutation } from "@tanstack/react-query";
import { createComment } from "../../apis/lp";
import { queryClient } from "../../App";

function useCreateComment(lpId: number) {
    return useMutation({
        mutationFn: (content: string) => createComment({ lpId, content }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
        },
    });
}

export default useCreateComment;
