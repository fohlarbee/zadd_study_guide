"use client";
import React from 'react'
import axios from 'axios'
import { Button } from './button';

const SubscriptionButton = ({isMember} :{isMember: boolean}) => {
    const [isLoading, setIsLoading] = React.useState(false)

    const handleSubscription = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get('/api/stripe');
            window.location.href = res.data.url;
        } catch (error) {
            console.log('error', error);
            
        }finally{
            setIsLoading(false);
        }
    }

  return (
    <Button disabled={isLoading} onClick={handleSubscription} variant='link'>
        {isMember ? 'Manage Subscriptions' : 'Upgrade to create more'}
    </Button>
  )
}

export default SubscriptionButton;