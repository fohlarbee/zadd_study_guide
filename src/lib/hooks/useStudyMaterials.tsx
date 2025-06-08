"use client";
import { useLocalStorage } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DrizzleStudyMaterial } from "../db/schema";

export type UseStudyMaterialsResult = {
    studyMaterials: DrizzleStudyMaterial[];
    studyMaterial: DrizzleStudyMaterial | undefined;
    setStudyMaterialId: (id: string) => void;
    studyMaterialId: string;
}
const useStudyMaterials = ():UseStudyMaterialsResult => {
    const [studyMaterialId, setStudyMaterialId] = useLocalStorage<string>('study-material-id', '');

    const {data: studyMaterials = []} = useQuery({
        queryKey: ['studyMaterials'],
        queryFn: async () => {
            const res = await axios.get('/api/study');
            return res.data.studyMaterials as DrizzleStudyMaterial[];
        }
    });
    const arrayMaterials = Array.isArray(studyMaterials) ? studyMaterials : [];

    const studyMaterial = arrayMaterials.find((material) => material.id === studyMaterialId);

    return {studyMaterials: arrayMaterials, studyMaterial, setStudyMaterialId, studyMaterialId};

}

export default useStudyMaterials;