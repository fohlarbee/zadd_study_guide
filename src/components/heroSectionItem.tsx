import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import { ArrowRightIcon } from 'lucide-react';

type itemProps = {
    icon: string;
    title: string;
    desc: string;
}

const HeroSectionItem = ({ icon, title, desc }: itemProps) => {
  return (
    <div className='flex flex-col items-center gap-4 p-4 mx-4 border border-muted rounded-md shadow-sm my-4
    justify-center hover:shadow-lg transition-all duration-300 cursor-pointer
    hover:bg-muted/50 hover:scale-105'>
        <Image src={icon} width={50} height={50} alt={title}/>
        <h2 className='font-bold text-primary text-sm md:text-lg text-center'>{title}</h2>
        <p className='text-muted-foreground text-xs md:text-sm text-center'>{desc}</p>
        <Button variant='link' className='text-primary text-sm md:text-base flex items-center gap-2 mt-2'>
            Learn More
            <ArrowRightIcon/>
        </Button>

    </div>
  )
}

export default HeroSectionItem