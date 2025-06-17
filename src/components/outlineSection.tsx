import React from 'react'
import OutlineSectionItem from './outlineSectionItem'
const items = [
    {
        index: 1,
        title:'Organize Notes',
        desc:'Begin by using AI to generate and structure your notes.'
    },
    {
        index: 2,
        title:'Create Quizzes',
        desc:'Transform your notes into interactive quizzes to test your knowledge.'
    },
    {
        index: 3,   
        title:'Create Flashcards',
        desc:'Utilize flashcards for quick reviews and active recall practice.'
    },
    {
        index: 4,
        title:'Track Progress',
        desc:'Monitor your learning progress and adjust your study strategies accordingly.'
    }
]
const OutlineSection = () => {
  return (
    <div className='w-full h-[390px] md:h-[420px] bg-[#fff] rounded-md shadow-sm mt-4 bg-sidebar/100 shadow-md '>
        <div className='justify-center items-center text-center mt-4'>
            <h2
            className='font-bold text-primary
     `       text-center tetxt-lg md:text-2xl lg:text-3xl pt-4'>How we Elevate your Learning Experience</h2>
            <p className=' text-muted-foreground text-center mx-4 text-sm md:text-base lg:text-lg'>Simple steps to transform your study routine and acheieve academic success</p>
        </div>
        <div className='w-full flex flex-col px-6 mt-4 md:px-12 gap-1 md:gap-0' >
            {items.map((item, index) => (
                <OutlineSectionItem key={index} {...item} />
            ))}
        </div>
    </div>
  )
}

export default OutlineSection