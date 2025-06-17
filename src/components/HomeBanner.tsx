import React from 'react'
import { Button } from './ui/button'
import { ExternalLinkIcon, TvMinimalPlayIcon } from 'lucide-react'

const HomeBanner = () => {
  return (
    <div className='h-98 md:h-120 bg-gradient-to-r from-gray-900 via-purple-900 to-violet-600 flex flex-col'>
        <div className='justify-start flex-col flex gap-2 mt-20 ml-10'>

             <h1 className='text-white text-4xl md:text-6xl font-bold'>Unlock your 
             </h1>
             <h1 className='text-white text-4xl md:text-6xl font-bold'> Learning Potential</h1>
             <h1 className='text-white text-4xl md:text-6xl font-bold'>
                with
                <span className=' shadow-md rounded-md p-2 mx-2'> Zadd SD</span>
             </h1>
             <p className='text-[#fff] md:w-[50%] pr-4 md:pr-2 mt-4 md-mt-6 md:mb-4 '>A comprehensive tool to enhance your retentive 
                learning and study. Build, share and master knowledge effectively

             </p>
             
        </div>
        <div className='pr-4 md:pr-2 mt-4 ml-10 flex gap-4'>
            <Button  className='px-4 flex gap-2'>
                <ExternalLinkIcon/>
                Start Creating now!
            </Button>
             <Button variant='outline' className='px-4 flex gap-2'>
                <TvMinimalPlayIcon/>
               Watch Demo
            </Button>
        </div>
    </div>
  )
}

export default HomeBanner