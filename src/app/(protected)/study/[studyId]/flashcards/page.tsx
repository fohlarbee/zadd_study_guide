"use client";
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import FlashcardItem from './flashcardItem';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type {  UseEmblaCarouselType } from 'embla-carousel-react';
import StepProgress from '../stepProgress';
import useStudyMaterial from '@/hooks/useStudyMaterial';
import { Button } from '@/components/ui/button';

export type Flashcard = {
    front: string,
    back: string

}
export type Flashcards = {
  id: string;
  studyId: string;
  content: Flashcard[];
  type: string;
  status: string;
  created_at: string;
  completed: boolean;
};

const FlashCards = () => {
    const {studyId} = useParams();
    const [flashcards, setFlashcards] = React.useState<Flashcards | null>(null);
    const [isFlipped, setIsFlipped] = React.useState(false);
    const [stepCountFlashcards, setStepCountFlashcards] = React.useState<number>(0);
    const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
    const [isLoadingStateFlashcards, setIsLoadingStateFlashcards] = React.useState<boolean>(false);
    const {studyMaterial} = useStudyMaterial();
    const router = useRouter();
    
    type CarouselApi = UseEmblaCarouselType[1]


    

    const handleClick = () => {
      setIsFlipped(!isFlipped);
    };
    const getFlashcards = async () => {

       const res = await axios.post('/api/study-type', {
                  studyId,
                  studyType: "flashcards"
              });
              setFlashcards(res.data);
    };
    

    React.useEffect(() => {
        (async () => {
            await getFlashcards();
        })();
    }, []);

    React.useEffect(() => {
      if (!api) return;
      api.on('select', () => {
        setIsFlipped(false); 
        const selectedIndex = api.selectedScrollSnap() ;
        setStepCountFlashcards(selectedIndex);
      })
    },[api])
  return (
    <div >
      <h2 className='font-bold text-center'>Flashcards</h2>
      <p className='mb-5 text-center'>The best way to learn is through active recall.</p>
       {flashcards && (
          <StepProgress
            data={flashcards?.content.map(item => item.front)}
            stepCount={stepCountFlashcards}
            setStepCount={(idx: number) => {
              setStepCountFlashcards(idx);
              if (api) {
                api.scrollTo(idx);
              }
            }}
          />
        )}
        

      <div className="flex-center items-center justify-center mt-10">
      
        {flashcards?.content && flashcards?.content.length > 0 && (

          <Carousel setApi={setApi}>
            <CarouselContent >

              {flashcards?.content.map((f, i) => (
                <CarouselItem key={i} className='flex w-full items-center justify-center relative'>
                  <FlashcardItem
                   flashcard={f}
                    isFlipped={isFlipped}
                    handleClick={handleClick}

                  />
                  <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10 hidden md:block">
                    <CarouselPrevious
                      onClick={() => {
                        if (api) {
                          api.scrollTo(Math.max(0, stepCountFlashcards - 1));
                        }
                      }}
                      className="bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
                    />
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10 hidden md:block">
                    <CarouselNext
                      onClick={() => {
                        if (api && flashcards?.content) {
                          api.scrollTo(Math.min(flashcards.content.length - 1, stepCountFlashcards + 1));
                        }
                      }}
                      className="bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

          </Carousel>
         
          )}
          
      </div>
       {Array.isArray(flashcards?.content) && flashcards?.content && flashcards.content.length > 0 && stepCountFlashcards === flashcards.content.length - 1 &&
                  <div className='flex flex-col justify-center items-center gap-2 mt-5'>
                      <h2 className=''>End of cards</h2>
                      <Button
                         disabled={isLoadingStateFlashcards || flashcards.completed}
                    className={`cursor-pointer ${ flashcards.completed ? 'bg-green-600 text-[#fff]' : ''}`}
                    onClick={!flashcards.completed ? async() => {
                        setIsLoadingStateFlashcards(true)
                          await axios.post('/api/progress', {
                            studyId,
                            progress: studyMaterial.progress! + 25,
                            type:'flashcards'
                          });
                         
                          setIsLoadingStateFlashcards(false)
                          router.back()
                    } : () => null}
                >
                    { flashcards.completed ? 'Done' : 'Mark as done'}
                      </Button>
                  </div>
              }
     
    </div>
  )
}

export default FlashCards;