"use client";
import { useLocalStorage } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DrizzleStudyMaterial } from "@/lib/db/schema";

export type UseStudyMaterialsResult = {
    studyMaterials: DrizzleStudyMaterial[];
    setStudyMaterials: (material: DrizzleStudyMaterial[] | undefined) => void;
    totalSTM: number;
}
const useStudyMaterials = ():UseStudyMaterialsResult => {
    const [studyMaterials, setStudyMaterials] = useLocalStorage<DrizzleStudyMaterial[] | undefined>('study-materials', undefined);
   const[totalSTM, setTotalSTM] = useLocalStorage<number>('total-study-materials', 0);
    const {data} = useQuery({
            queryKey: ['studyMaterials'],
            queryFn: async () => {
                const res = await axios.get('/api/study');
                setStudyMaterials(res.data.studyMaterials);
                  setTotalSTM(res.data.studyMaterials.length);
                return res.data.studyMaterials as DrizzleStudyMaterial[];
            }
        });
    const arrayMaterials = Array.isArray(data) ? data : [];

    return {studyMaterials: arrayMaterials,  setStudyMaterials, totalSTM};

};

export default useStudyMaterials;