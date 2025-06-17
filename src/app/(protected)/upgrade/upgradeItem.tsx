"use client";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { CheckIcon } from 'lucide-react';
import React from 'react'
type UpgradeItemProps = {
    name: string;
    price: string;
    numberOfCourses: string;
    support: string;
    emailSupport: boolean;
    tag: string;
    btn: string;
}

const UpgradeItem = ({ item, isMember }: { item: UpgradeItemProps, isMember: boolean }) => {
  const onCheckout = async() => {
    const res = await axios.post('/api/checkout' );
    return window.location.href = res.data.url;
  }
  return (
    <div className='border border-sidebar-border rounded-lg p-4 flex flex-col gap-2 items-center
    shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer'>
      <h2 className='text-center font-bold text-sm md:text-lg'>{item.name}</h2>
      <div
      className='flex flex-row gap-1'
      >
        <p className='font-bold text-2xl '>{item.price}$</p>
         <span className='text-sm mt-auto text-primary'>/Monthly</span>
        </div>
          <ul className='flex flex-col gap-2 text-sm md:text-base text-muted-foreground mt-2'>
            <li className='flex items-center gap-2'>
              <CheckIcon className='size-5'/>
              {item.numberOfCourses} Course Generated
            </li>
              <li className='flex items-center gap-2'>
              <CheckIcon className='size-5'/>
              {item.support} 
            </li>
            <li className='flex items-center gap-2'>
              <CheckIcon className='size-5'/>
              {item.emailSupport ? 'Email Support' : 'No Email Support'} 
            </li>
             <li className='flex items-center gap-2'>
              <CheckIcon className='size-5'/>
              {item.tag} 
            </li>

          </ul>

          <Button 
          disabled={item.btn === 'Current Plan'}
          onClick={item.btn === 'Current Plan' ? undefined : () => onCheckout()}
          variant={item.btn === 'Current Plan' ? 'link' : 'default'} className='mt-4 w-full cursor-pointer'>
           {isMember && item.btn !== 'Current Plan' ? 'Manage Subscriptions' : item.btn}
          </Button>
       
    </div>
  )
}

export default UpgradeItem;