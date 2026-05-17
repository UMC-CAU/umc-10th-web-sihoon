import { useMutation } from "@tanstack/react-query";
import { deletelike } from "../../apis/lp";
import { queryClient } from "../../App";


function useDeleteLike() {
    return useMutation({
        mutationFn:deletelike,
        onSuccess:(data)=>{
                  queryClient.invalidateQueries({
                    queryKey:[data.data.lpId],
                  });
                }
    });
}

export default useDeleteLike;