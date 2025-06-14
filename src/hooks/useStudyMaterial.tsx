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
            const res =  await axios.get(`/api/study?studyId=${studyId}`);
            if (res.data.studyMaterial) {
                setStudyMaterialId(res.data.studyMaterial.courseId);
                return res.data.studyMaterial as DrizzleStudyMaterial;
            }
            return null;
        }
    });

    return { studyMaterial, setStudyMaterialId, studyMaterialId, setStudyMaterial};

}

export default useStudyMaterial;