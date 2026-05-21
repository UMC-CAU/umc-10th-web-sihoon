import { useMutation } from "@tanstack/react-query";
import { updateComment } from "../../apis/lp";
import { queryClient } from "../../App";

function useUpdateComment(lpId: number) {
    return useMutation({
        mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
            updateComment({ lpId, commentId, content }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
        },
    });
}

export default useUpdateComment;
