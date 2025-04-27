"use client";
import { Button } from '@/components/ui/button'
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { signOut, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

const DashboardPage = () => {
    const { status } = useAuthRedirect();

    const logout = async () => {
        await signOut({ callbackUrl: '/' });
    };

    if (status === "loading") {
        return (
          <div className="h-screen flex items-center justify-center bg-gray-100">
            <p className="text-gray-600 text-xl">Loading...</p>
          </div>
        );
      }

    return (
        <div>
            <div>DashboardPage</div>
            <Button
                onClick={logout}
                className='bg-green-600 hover:bg-green-700 text-white text-sm md:text-base'>
                signout
            </Button>
        </div>
    )
}

export default DashboardPage