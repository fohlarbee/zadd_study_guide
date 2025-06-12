import { queryClient } from "@/lib/providers/queryProvider";

const useRefresh = () => {
    return async () => {
        await queryClient.invalidateQueries({
            type:'all'
        })
    }
};

export default useRefresh;