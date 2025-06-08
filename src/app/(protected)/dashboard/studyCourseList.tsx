"use client";
import useStudyMaterials from '@/lib/hooks/useStudyMaterials';
import React from 'react'
import StudyCourseListItem from './studyCourseListItem';

const StudyCourseList = () => {
    const {studyMaterials, studyMaterial, setStudyMaterialId, studyMaterialId} = useStudyMaterials();
  return (
    <div className='flex flex-col gap-4 mt-7'>
       <h2 className='font-bold text-sm md:text-lg'>Your study Guide Materials</h2>
       <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2'>
        {studyMaterials!.map((m, i) => 
           (
            <StudyCourseListItem key={i}  studyMaterial={m}/>
          )
        )}
       </div>
    </div>
  )
}

export default StudyCourseList; 