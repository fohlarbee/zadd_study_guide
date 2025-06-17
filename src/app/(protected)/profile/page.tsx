import { UserProfile } from '@clerk/nextjs';
import React from 'react'

const Profile = () => {
  return (
    <div className='flex justify-center items-center bg-background'>
      
      <UserProfile />
    </div>
  )
}

export default Profile;