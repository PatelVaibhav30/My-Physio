"use client";
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react';
import React from 'react'

const Header = () => {
  const session = useSession();
  
  const logout = async () => {
    await signOut({ callbackUrl: '/' });
  };


  return (
    <header className='bg-white sticky top-0 z-50 h-10 w-full flex items-center justify-between p-7 shadow-md'>
      <div className='flex flex-col items-start'>
        <span className='font-semibold'>Welcome!</span>
        <span className='text-gray-600'>{session && session.data?.user?.name}</span>
      </div>
        <Button
          onClick={logout}
          className='text-white text-sm md:text-base'>
          Logout
        </Button>
    </header>
  )
}

export default Header