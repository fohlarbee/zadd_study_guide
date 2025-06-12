"use client";
import useStudyMaterials from '@/hooks/useStudyMaterials';
import React from 'react'
import StudyCourseListItem from './studyCourseListItem';
import { Button } from '@/components/ui/button';
import { RefreshCcwIcon } from 'lucide-react';
import useRefresh from '@/hooks/useRefresh';
import { useLocalStorage } from 'usehooks-ts';

const StudyCourseList = () => {
    const {studyMaterials } = useStudyMaterials();
    const [isMaterialReady, setIsMaterialReady] = useLocalStorage<boolean>('isMaterialReady', false)
    const refresh = useRefresh();
    
    const refreshStates = async () => {
      setIsMaterialReady(true);
      await refresh();
      setIsMaterialReady(false);
    };


  return (
    <div className='flex flex-col gap-4 mt-7'>
      <div className='flex gap-2 justify-between'>

       <h2 className='font-bold text-sm md:text-lg'>Your study Guide Materials</h2>
       <Button className='text-primary' variant='outline' onClick={refreshStates}>
        <RefreshCcwIcon/>
        Refresh</Button>
      </div>
       <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2'>
        {!isMaterialReady ? studyMaterials!.map((m, i) => 
           (
            <StudyCourseListItem key={i}  studyMaterial={m}/>
          )
        )
      : (
        [1,2,3,4,5,6].map((_, i) => (
          <div key={i} className='h-56 w-full bg-sidebar-border rounded-lg shadow-lg animate-pulse '>

          </div>
        ))
      )}
       </div>
    </div>
  )
}

export default StudyCourseList; 