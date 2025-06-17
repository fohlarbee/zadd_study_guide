"use client";
import { useLocalStorage } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type isMemberProps = {
   isMember: boolean;
   setIsMember: (isMember: boolean) => void
}
const useIsMember = () => {
    const [isMember, setIsMember] = useLocalStorage<boolean>('isMember', false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {data } = useQuery({
        queryKey: ['isMember'],
        queryFn: async () => {
            const res =  await axios.get(`/api/isMember`);
            setIsMember(res.data.isMember);
            return res.data.isMember;
        }
    });

    return {isMember, setIsMember}
}

export default useIsMember;