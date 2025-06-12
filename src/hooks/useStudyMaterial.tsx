"use client";
import { useLocalStorage } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DrizzleStudyMaterial } from "@/lib/db/schema";
import { useParams } from "next/navigation";

export type UseStudyMaterialsResult = {
    studyMaterial: DrizzleStudyMaterial;
    setStudyMaterial: (material: DrizzleStudyMaterial) => void; 
    setStudyMaterialId: (id: string) => void;
    studyMaterialId: string;
}
const useStudyMaterial = ():UseStudyMaterialsResult => {
    const [studyMaterialId, setStudyMaterialId] = useLocalStorage<string>('studyMaterialId', '');
    const [studyMaterial, setStudyMaterial] = useLocalStorage<DrizzleStudyMaterial>('studyMaterial', {} as DrizzleStudyMaterial);
    const {studyId} = useParams();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {data } = useQuery({
        queryKey: ['studyMaterial'],
        queryFn: async () => {
             if (!studyId) return undefined;
            const res =  await axios.get(`/api/study?studyId=${studyId}`);
            // console.log('useStudyMaterial res', res);
            setStudyMaterial(res.data.studyMaterial);
            // console.log('useStudyMaterial', res.data.studyMaterial);
            return res.data.studyMaterial as DrizzleStudyMaterial;
        }
    });

    return { studyMaterial, setStudyMaterialId, studyMaterialId, setStudyMaterial};

}

export default useStudyMaterial;