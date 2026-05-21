import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "../../apis/lp";
import { queryClient } from "../../App";

function useDeleteComment(lpId: number) {
    return useMutation({
        mutationFn: (commentId: number) => deleteComment({ lpId, commentId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
        },
    });
}

export default useDeleteComment;
