import React from 'react';
import ReactCardFlip from 'react-card-flip';
import { Flashcard } from './page';


type FlashcardItemProps = {
    isFlipped: boolean;
    handleClick: () => void;
    flashcard: Flashcard;

}
const FlashcardItem = ({ isFlipped, handleClick, flashcard }: FlashcardItemProps) => {
  return (
    <div className='flex items-center justify-center h-full w-full'>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div className='p-4 bg-primary border text-[#fff] shadow-lg border-sidebar flex items-center justify-center rounded-md
        cursor-pointer h-[250px] w-[200px] md:h-[350px] md:w-[300px]'
        onClick={handleClick}>
            <h2 className='text-center'><span className='font-bold'>Question: </span>{flashcard.front}</h2>
        </div>

        <div className='p-4 bg-[#fff] shadow-lg border-2 flex items-center justify-center rounded-md
        cursor-pointer h-[250px] w-[200px] md:h-[350px] md:w-[300px]'
        onClick={handleClick}>
            <h2 className='text-center'><span className='font-bold'>Answer:</span> {flashcard.back}</h2>
        </div>
      </ReactCardFlip>
    </div>
  )
}

export default FlashcardItem