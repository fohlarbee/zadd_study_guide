import { cn } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts';

const SelectOption = ({selectedStudyType}: {selectedStudyType: (type: string) => void}) => {
    const options = [
        {
            name: "Exam",
            icon:"/exam_1.png",
        },
        {
           name: "Job Interview",
           icon:"/job.png"
        },
         {
           name: "Practice",
           icon:"/practice.png"
        },
         {
           name: "Coding",
           icon:"/code.png"
        },
         {
           name: "Others",
           icon:"/knowledge.png"
        },
    ];
    const [selectedOption, setSelectedOption] = useLocalStorage<string | null>('selected-option', null);
  return (
    <div>
        <h2 className='text-center mb- text-lg text-primary/80 mb-2'>
            For which do you want to create a study guide for?
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
            {options.map((o, i) => {
                return (
                    <div key={i} 
                    onClick={() => {setSelectedOption(o.name); selectedStudyType(o.name)}}
                    className={cn(`p-4 flex flex-col items-center justify-center border
                    border-sidebar-border rounded-lg hover:border-primary shadow-lg cursor-pointer`, 
                    selectedOption === o.name ? 'border-primary' : 'border-transparent'             
                    )}>
                        <Image src={o.icon} width={50} height={50} alt={o.name}/>
                        <p className='text-sm text-muted-foreground mt-2'>{o.name}</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default SelectOption