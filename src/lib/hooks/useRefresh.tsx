import { queryClient } from "../providers/queryProvider"

const useRefresh = () => {
    return async () => {
        await queryClient.invalidateQueries({
            type:'all'
        })
    }
};

export default useRefresh;