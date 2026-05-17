import { useMutation } from "@tanstack/react-query";
import { postlike } from "../../apis/lp";
import { queryClient } from "../../App";


function usePostLike() {
    return useMutation({
        mutationFn:postlike,
        onSuccess:(data)=>{
          queryClient.invalidateQueries({
            queryKey:["lp", data.data.lpId],
          });
        }
      });
}

export default usePostLike;