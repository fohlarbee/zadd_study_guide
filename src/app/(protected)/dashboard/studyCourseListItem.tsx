import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import useStudyMaterial from '@/hooks/useStudyMaterial';
import { DrizzleStudyMaterial } from '@/lib/db/schema'
import { RefreshCwIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


type StudyCourseListItemProps = {
    studyMaterial: DrizzleStudyMaterial;
}
const StudyCourseListItem = ({studyMaterial}: StudyCourseListItemProps) => {
        const {setStudyMaterialId} = useStudyMaterial();
    
  return (
    <div className='border border-sidebar-border rounded-lg p-5 transition-colors duration-200 cursor-pointer hover:bg-secondary shadow-lg'>
        <div>
            <div className='flex justify-between items-center'>
                <Image src='/knowledge.png' alt={studyMaterial.topic} 
                width={50} height={50}/>
                <p className='text-[10px] text-[#fff] p-1 px-2 rounded-full bg-primary shadow-2xl'>7 June 2025</p>
            </div>
            <h2 className='font-semibold mt-2 text-sm line-clamp-1'>{(studyMaterial.courseLayout as {studyGuideTitle: string}).studyGuideTitle}</h2>
            <p className='text-xs text-muted-foreground line-clamp-2 mt-2'>{(studyMaterial.courseLayout as { studySummary: string }).studySummary}</p>
            <div className='flex items-center justify-between mt-2'>
                <Progress value={30}/>
            </div>
            <div className='flex items-center justify-end mt-2 '>
                {studyMaterial.status === 'Generating'
                ? (<>
                    <Button 
                    disabled={true}
                    variant='outline' className='animate-pulse text-sm font-medium shadow-lg cursor-pointer '>
                        <RefreshCwIcon className='text-primary animate-spin'/>
                        Generating...
                    </Button>
                </>)
                : (<>
                <Link href={`/study/${studyMaterial.courseId}`}>
                  <Button 
                  onClick={() => setStudyMaterialId(studyMaterial.courseId)}
                  className='text-sm font-medium shadow-lg cursor-pointer'>View</Button>
                </Link>

                </>)
                }
            </div>
        </div>
    </div>
  )
}

export default StudyCourseListItem