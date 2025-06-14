import { Button } from '@/components/ui/button';
import { DrizzleStudyMaterial } from '@/lib/db/schema';
import axios from 'axios';
import { RefreshCcwIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import toast from 'react-hot-toast';


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
    studyId: string,
    studyMaterial: DrizzleStudyMaterial,
    refreshData:(data: boolean) => void

}
const cleanChapterTitle = (title: string) => {
  return title.replace(/^Chapter \d+:\s*/, '');
}
const MaterialItemCard = ({ item, studyTypeContent, studyId, studyMaterial, refreshData }: Props) => {
  const [loading, setLoading] = React.useState(false);

  const generateContent = async () => {
    toast.custom('Generating')
    setLoading(true);
    const topics: string[] = [];
    (studyMaterial?.courseLayout as { chapters?: { chapterTitle: string }[] })?.chapters?.forEach((chapter) => {
      topics.push(cleanChapterTitle(chapter.chapterTitle));
    });
     await axios.post('/api/study-type-content', {
      studyId,
      type: item.type,
      topics,
      // studyType: item.type
    });
    refreshData(true)
    setLoading(false);
    toast.success(`Your ${item.type} is ready`)
  }
  return (
    studyTypeContent?.[item.type] !== undefined &&

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
          <Button
            onClick={item.type === 'qa' ? undefined : generateContent}
            disabled={loading || item.type === 'qa'}
            variant={'outline'}
            className='text-xs md:text-sm text-primary
            cursor-pointer hover:bg-primary hover:text-secondary transition-colors duration-200 flex justify-center mt-auto w-[90%]'
          >
            {loading && item.type !== 'qa' && <RefreshCcwIcon className='animate-spin' />}
            {item.type === 'qa' ? 'Coming soon' : 'Generate'}
          </Button>
        )
      : (
        <Link href={`/study/${studyId}/${item.link}`} className='w-full'>
          <Button variant={'outline'} className='cursor-pointer text-xs md:text-sm text-primary hover:bg-primary hover:text-secondary transition-colors duration-200
         flex justify-center mt-auto w-[90%]'>
             {item.name}
          </Button>
        </Link>

      )}
    </div>
  )
}

export default MaterialItemCard;