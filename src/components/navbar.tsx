"use client";
import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const items = [
    {
        name: 'Features',
        href: '/features'
    },
    {
        name: 'How it works',
        href: '/about'
    },
    {
        name: 'Pricing',
        href: '/pricing'
    },
    {
        name: 'Contact',
        href: '/contact'
    }
]
const Navbar = () => {
  const {isSignedIn}  = useUser();
  const router = useRouter();
  return (
    <nav className='h-20 border border-b  flex items-center justify-between px-4 md:px-12
    sticky top-0 bg-background z-50 shadow-md'>
        <div className='flex gap-3 ' >
            <Image src="/knowledge.png" alt="Logo" width={50} height={50}
            className='rounded-md shadow-sm p-2' />

            <p className='mt-auto mb-auto font-bold text-xl md:text-2xl
            hidden md:inline-block'>Zadd SD</p>
        </div>
        <div className='hidden md:block'>
            <ul>
               { items.map((item, index) => (
                <li key={index} className='inline-block mx-2 text-sm md:text-lg text-muted-foreground hover:text-primary-foreground transition-all duration-300'>
                    <Link href={item.href}>{item.name}</Link>
                </li>
               ))} 
            </ul>
        </div>
        <Button
        className='cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300'
        onClick={isSignedIn ? () => router.push('/dashboard') : () => router.push('/sign-up')}
        >{isSignedIn ? 'Dashboard' : 'Get Started'}</Button>

    </nav>
  )
}

export default Navbar;