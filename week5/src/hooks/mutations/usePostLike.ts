import { useMutation } from "@tanstack/react-query";
import { postlike } from "../../apis/lp";
import { queryClient } from "../../App";


function usePostLike() {
    return useMutation({
        mutationFn: postlike,

        onMutate: async (lpId: number) => {
            await queryClient.cancelQueries({ queryKey: ["lp", lpId] });

            const previousData = queryClient.getQueryData(["lp", lpId]);
            const prev = previousData as any;
            const me = queryClient.getQueryData(["myInfo"]) as any;
            const userId = Number(me?.data?.id);

            // likes 배열 복사 후 push (원본 previousData 오염 방지)
            const newLikes = [...(prev?.data?.likes ?? [])];
            const alreadyLiked = newLikes.some(
                (like: { userId: number }) => like.userId === userId
            );
            if (!alreadyLiked) {
                newLikes.push({ userId, lpId });
            }

            const newLpPost = {
                ...prev,
                data: { ...prev?.data, likes: newLikes },
            };

            queryClient.setQueryData(["lp", lpId], newLpPost);

            return { previousData };
        },

        onError: (_err, variables, context) => {
            queryClient.setQueryData(["lp", variables as number], context?.previousData);
        },

        onSettled: async (_data, _error, variables) => {
            await queryClient.invalidateQueries({ queryKey: ["lp", variables] });
        },
    });
}

export default usePostLike;
