import { Button } from '@/components/ui/button';
import React from 'react'

type StepProgressProps = {
    stepCount: number;
    setStepCount: (step: number) => void;
    data: string[];
}
const StepProgress = ({ stepCount, setStepCount, data }: StepProgressProps) => {
  return (
    <div className='flex gap-2 md:gap-5 items-center'>
        {stepCount !== 0 && <Button variant='outline' size='icon'
        className='text-xs text-center '
        onClick={() => setStepCount(stepCount - 1)}>Prev</Button>}
        {data?.map((item, index) => (
             <div
                key={index}
                className={`
                    flex-1 min-w-[6px] w-full max-w-[110px] h-2 rounded-md justify-center mt-auto mb-auto
                    ${index <= stepCount ? 'bg-primary' : 'bg-gray-200'}
                    mx-0.5
                `}   
            >
            </div>
        ))}
        {stepCount !== data.length - 1 && <Button variant='outline' size='icon'
        className='text-xs text-center '
        onClick={() => setStepCount(stepCount + 1)}>Next</Button>}
    </div>
  )
}

export default StepProgress;