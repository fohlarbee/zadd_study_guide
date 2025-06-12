import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


export type MaterialType = 'notes' | 'flashcards' | 'quiz' | 'qa';

type Props = {
    item:{

        name: string;
        desc: string;
        icon: string;
        link: string;
        type: MaterialType;
    },
    studyTypeContent: Record<MaterialType, []>;
    studyId: string

}
const MaterialItemCard = ({ item, studyTypeContent, studyId }: Props) => {
  return (
    <div className={`relative flex flex-col items-center gap-4 p-4 border border-sidebar-border hover:bg-secondary transition-colors duration-200 cursor-pointer
    rounded-lg shadow-lg hover:shadow-xl ${studyTypeContent?.[item.type] === null  && 'grayscale'}`}>

      {studyTypeContent?.[item.type] === null ?
      ( <h2 className='text-[#fff] bg-gray-400 px-2 p-1 rounded-md shadow-md text-xs md:tet-sm font-semibold'>Not ready</h2>)
    : ( <h2 className='text-[#fff] bg-green-400 px-2 p-1 rounded-md shadow-md text-xs md:tet-sm font-semibold'>Ready</h2>)}
       
        <Image src={item.icon} alt={item.name} width={50} height={50} />
        <h2 className='font-semibold text-xs md:text-sm'>{item.name}</h2>
        <p className='text-xs md:text-sm text-muted-foreground text-center'>{item.desc}</p>

        {studyTypeContent?.[item.type] === null ? 
        (
           <Button variant={'outline'} className='text-xs md:text-sm text-primary hover:bg-primary hover:text-secondary transition-colors duration-200
            flex justify-center mt-auto w-[90%]'>
             Generate
          </Button>
        )
      : (
        <Link href={`/study/${studyId}/${item.link}`} className='w-full'>
          <Button variant={'outline'} className='text-xs md:text-sm text-primary hover:bg-primary hover:text-secondary transition-colors duration-200
         flex justify-center mt-auto w-[90%]'>
             {item.name}
          </Button>
        </Link>

      )}
    </div>
  )
}

export default MaterialItemCard;