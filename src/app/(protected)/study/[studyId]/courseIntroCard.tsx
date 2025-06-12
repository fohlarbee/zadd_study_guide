import { Progress } from '@/components/ui/progress';
import { DrizzleStudyMaterial } from '@/lib/db/schema';
import Image from 'next/image'
import React from 'react';

type Props = {
  studyMaterial: DrizzleStudyMaterial;
}

const CourseIntroCard = ({studyMaterial}: Props) => {
  return (
    <div className='flex mx-auto gap-5 items-center bg-secondary p-8 rounded-lg shadow-lg w-full'>
      <Image src='/knowledge.png' alt='Course-intro' width={70} height={70} />
      <div>
        <h2 className=' text-sm md:text-lg font-semibold'>{(studyMaterial?.courseLayout as {studyGuideTitle: string}).studyGuideTitle}</h2>
        <p className='text-xs md:text-sm text-muted-foreground line-clamp-2'>{(studyMaterial?.courseLayout as {studySummary: string}).studySummary}</p>
        <Progress value={30} className='mt-3'/>

        <p className='text-xs md:text-sm mt-3 line-clamp-2 text-primary'>Total Chapters: <span className=' font-bold'>
          {(studyMaterial?.courseLayout as {chapters: []}).chapters.length}</span></p>
      </div>
       
    </div>
  )
}

export default CourseIntroCard