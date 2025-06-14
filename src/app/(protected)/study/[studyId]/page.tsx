"use client";
import React from 'react'
import CourseIntroCard from './courseIntroCard';
import useStudyMaterial from '@/hooks/useStudyMaterial';
import StudyMaterialSection from './studyMaterialSection';
import ChapterList, { CourseLayout } from './chapterList';

const StudyPage = () => {
    const { studyMaterial} = useStudyMaterial();
  
  return (
    <div className=' mt-10 w-full '>
       {/* StudyIntro */}
       {studyMaterial && <CourseIntroCard studyMaterial={studyMaterial} />}

       {/* StudyMaterialOption */}
       <StudyMaterialSection studyId={studyMaterial!.courseId} studyMaterial={studyMaterial} />

        {/* ChapterList */}
       {studyMaterial && (
         <ChapterList
           studyMaterial={{
             ...studyMaterial,
             courseLayout: studyMaterial.courseLayout as CourseLayout,
           }}
         />
       )}

        {/* Quiz */}

    </div>
  )
}

export default StudyPage