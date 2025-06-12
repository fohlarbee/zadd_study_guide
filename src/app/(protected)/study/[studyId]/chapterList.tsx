import { DrizzleStudyMaterial } from '@/lib/db/schema';
import React from 'react'

type ChapterProps = {
  chapterTitle: string;
  summary: string;
  topics: string[];
};

export type CourseLayout = {
  chapters: ChapterProps[];
  // add other properties of courseLayout here if needed
};

type DrizzleStudyMaterialWithChapters = DrizzleStudyMaterial & {
  courseLayout: CourseLayout;
};

type Props = {
  studyMaterial: DrizzleStudyMaterialWithChapters;
};

const ChapterList = ({ studyMaterial }: Props) => {
  const chapters = studyMaterial?.courseLayout?.chapters;

  return (
    <div className='mt-8'>
        <h2 className='font-bold text-sm md:text-lg'>Chapters</h2>
        
        <div className='mt-4'>
         {chapters.map((c,i) => {
          const [chapterNumber, ...chapterTitleParts] = c.chapterTitle.split(":");
          const chapterTitle = chapterTitleParts.join(":").trim();
          return (

            <div key={i} className='flex gap-5 item-center p-4 border shadow-md mb-2 rouded-lg cursor-pointer'>
              <h2 className='font-bold my-auto'>{chapterNumber.replace('Chapter', " ")}</h2>
              <div>
                <h2 className='font-semibold text-sm md:text-lg'>{chapterTitle}</h2>
                <p className='font-medium text-muted-foreground text-xs md:text-sm'>{c.summary  }</p>
              </div>
            </div>
          )
  })}
        </div>
    </div>
  )
}

export default ChapterList; 