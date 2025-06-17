"use client";
import { useLocalStorage } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DrizzleStudyMaterial } from "@/lib/db/schema";
import { useParams } from "next/navigation";
import React from 'react';

export type UseStudyMaterialsResult = {
    studyMaterial: DrizzleStudyMaterial;
    setStudyMaterial: (material: DrizzleStudyMaterial) => void; 
    setStudyMaterialId: (id: string) => void;
    studyMaterialId: string;
    progress: number;
    setProgress: (progress:number) => void;
}
const useStudyMaterial = ():UseStudyMaterialsResult => {
    const [studyMaterialId, setStudyMaterialId] = useLocalStorage<string>('studyMaterialId', '');
    const [studyMaterial, setStudyMaterial] = useLocalStorage<DrizzleStudyMaterial>('studyMaterial', {} as DrizzleStudyMaterial);
    const [progress, setProgress] = useLocalStorage<number>('progress', 0)
    const {studyId} = useParams();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {data } = useQuery({
        queryKey: ['studyMaterial'],
        queryFn: async () => {
            const res =  await axios.get(`/api/study?studyId=${studyId}`);
            if (res.data.studyMaterial) {
                setStudyMaterialId(res.data.studyMaterial.courseId);
                setProgress(res.data.studyMaterial.progress)
                return res.data.studyMaterial as DrizzleStudyMaterial;
            }
            return null;
        }
    });
     // Sync fetched data to localStorage
    React.useEffect(() => {
        if (data) setStudyMaterial(data);
    }, [data, setStudyMaterial]);
    return { studyMaterial, setStudyMaterialId, studyMaterialId, setStudyMaterial, progress, setProgress};

}

export default useStudyMaterial;