"use client";
import React from 'react'
import WelcomeBanner from './WelcomeBanner';
import StudyCourseList from './studyCourseList';

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <WelcomeBanner />
      <StudyCourseList/>
    </div>
  )
}

export default Dashboard;