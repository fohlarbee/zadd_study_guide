"use client";
import axios from 'axios';
import { useParams } from 'next/navigation';
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
};

const FlashCards = () => {
    const {studyId} = useParams();
    const [flashcards, setFlashcards] = React.useState<Flashcards | null>(null);
    const [isFlipped, setIsFlipped] = React.useState(false);
    const [stepCount, setStepCount] = React.useState<number>(0);
    const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
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
        getFlashcards();
    }, []);
    React.useEffect(() => {
      if (!api) return;
      api.on('select', () => {
        setIsFlipped(false); 
        const selectedIndex = api.selectedScrollSnap() ;
        setStepCount(selectedIndex);
      })
    },[api])
  return (
    <div>
      <h2 className='font-bold'>Flashcards</h2>
      <p className='mb-5'>The best way to learn is through active recall.</p>
        <div className='flex gap-2 items-center justify-evenly'>

            {flashcards?.content.slice(0, -1).map((n, i) => (

                  <div
                      key={i}
                      className={`
                          flex-1 min-w-[6px] w-full max-w-[110px] h-2 rounded-md justify-center mt-auto mb-auto
                          ${i <= stepCount ? 'bg-primary' : 'bg-gray-200'}
                          mx-0.5
                      `}
                      
                  >
                  </div>
            ))}


          
          

        </div>

      <div className="flex-center items-center justify-center mt-10">
      
        {flashcards?.content && flashcards?.content.length > 0 && (

          <Carousel setApi={setApi}>
            <CarouselContent >

              {flashcards?.content.map((f, i) => (
                <CarouselItem  key={i} className='flex w-full items-center justify-center'>
                  <FlashcardItem 
                  flashcard={f} isFlipped={isFlipped} handleClick={handleClick}/>
              
                </CarouselItem>
              ))}
            </CarouselContent>
              <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10 hidden md:block ">
              <CarouselPrevious
              onClick={() => setStepCount(stepCount - 1)} className="bg-white shadow-md rounded-full p-2 hover:bg-gray-100" />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10 hidden md:block">
              <CarouselNext onClick={() => setStepCount(stepCount + 1)} className="bg-white shadow-md rounded-full p-2 hover:bg-gray-100" />
              </div>

          </Carousel>
         
          )}
          
      </div>
     
    </div>
  )
}

export default FlashCards;