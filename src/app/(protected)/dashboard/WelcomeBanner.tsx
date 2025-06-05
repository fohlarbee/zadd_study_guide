"use client";
import { useUser } from '@clerk/nextjs'
import Image from 'next/image';
import React from 'react'

const WelcomeBanner = () => {
    const {user} = useUser();

  return (
    <div className='flex bg-gray-100  p-4 rounded-lg shadow-lg w-full text-[#fff]'>
        <Image
            src='/video-lesson.png'
            alt="laptop"
            width={50}
            height={50}
            className='rounded-full mr-4 sm:w-[100px] sm:h-[100px]'
        />
        <div className="h-2"></div>
        .<div className='flex flex-col justify-center'>
            <h1 className='text-lg md:text-2xl font-bold text-primary'>Welcome, {user?.firstName || 'User'}!</h1>
            <p className='text-xs md:text-sm text-muted-foreground'>Ready to start your journey? Explore our resources and get started today.</p>
        </div>

    </div>
  )
}

export default WelcomeBanner;