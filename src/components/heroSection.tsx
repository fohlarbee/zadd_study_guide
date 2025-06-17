import React from 'react'
import HeroSectionItem from './heroSectionItem'

const HeroSection = () => {
  const items = [
    {
      icon:'/practice.png' ,
      title: 'Create Dynamic Study Guide',
      desc:'Get organized notes, into visuallly appealing and interactive study material.Linking concepts and personalizing your learning experience.',

    },
     {
      icon: '/quiz.png',
      title: 'Create Interactive Quizzes',
      desc:'Create quizzes with diverse questions to test your knowledge.Get instant feedback and track your progress to solidify understanding.',
      
    },
    {
      icon: '/flashcard.png',
      title: 'Create Interactive Quizzes',
      desc:'Master vocabulary and key concept with our intelligent flashcard system. Spaced repition algorithms ensure effective memorization and retention.',
      
    },

  ]
  return (
    <div className='mt-4'>
      <h2 className='font-bold text-primary
      text-center tetxt-lg md:text-2xl lg:text-3xl
      '>Your All in-one learning Assistant</h2>
      <p
      className='
       text-muted-foreground text-center mx-4 text-sm md:text-base lg:text-lg'
      >We provide powerful tools to helps revolutionize your study and boost retention</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 px-4 md:px-12'>
        {items.map((item, index) => (
          <HeroSectionItem key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

export default HeroSection