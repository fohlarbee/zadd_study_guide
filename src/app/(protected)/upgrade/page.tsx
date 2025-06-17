"use client";
import React from 'react'
import UpgradeItem from './upgradeItem'
import useIsMember from '@/hooks/useIsMember';
const items = [
    {
        name: 'Free',
        price: '0',
        numberOfCourses: '5',
        support: 'Limited Support',
        emailSupport: false,
        tag: 'Help center access',
        btn: 'Current Plan',

    },
        {
        name: 'Monthly',
        price: '9.99',
        numberOfCourses: "Unlimited",
        support: 'Unlimited Flashcards, Quiz',
        emailSupport: true,
        tag: 'Help center access',
        btn: 'Get Started',
         
    }
]
const Upgrade = () => {
    const {isMember} = useIsMember();
  return (
    <div>
        <div className='flex flex-col gap-1 items-center mt-4 md:mt-10'>
            <h2 className='font-bold text-lg md:text-2xl'>Plans</h2>
            <p className='text-xs md:text-lg text-muted-foreground'>
                Upgrade your plan to Generate unlimited study materials
            </p>
        </div>
        <div className='mx-auto max-w-3xl px-4 sm:px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5'>
            {items.map((item, index) => (
                <UpgradeItem item={item} key={index} isMember={isMember}/>
            ))}
        </div>
    </div>
  )
}

export default Upgrade