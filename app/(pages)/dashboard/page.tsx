import { getNotes } from '@/action/noteAction';
import { createUser } from '@/action/userAction';
import Notes from '@/app/(component)/Notes';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Button } from '@/components/ui/button';
import { Pin } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    const user = await createUser(session?.user?.name || "Anonymous", session?.user?.email || "anonymous@example.com", "");

    return (
        <div className="max-w-[1250px] mx-auto px-6 py-6 border-2 rounded-md bg-white">
            <h1 className='text-3xl font-semibold mb-6'>Dashboard</h1>
            <div className='grid grid-cols-3 gap-6'>
                <div className='flex flex-col items-center justify-center rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer p-3 shadow-md bg-blue-100'>
                    <Image height={50} width={50} src="/patient.svg" alt='patient' />
                    <span className='text-3xl font-extrabold text-blue-700'>6</span>
                    <h1 className="text-sm font-medium text-gray-600 text-center mt-1">TOTAL PATIENTS</h1>
                </div>

                <div className='flex flex-col items-center justify-center rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer p-3 shadow-md bg-blue-100'>
                    <Image height={50} width={50} src="/patient.svg" alt='patient' />
                    <span className='text-3xl font-extrabold text-blue-700'>6</span>
                    <h1 className="text-sm font-medium text-gray-600 text-center mt-1">TOTAL PATIENTS</h1>
                </div>

                <div className='flex flex-col items-center justify-center rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer p-3 shadow-md bg-blue-100'>
                    <Image height={50} width={50} src="/patient.svg" alt='patient' />
                    <span className='text-3xl font-extrabold text-blue-700'>6</span>
                    <h1 className="text-sm font-medium text-gray-600 text-center mt-1">TOTAL PATIENTS</h1>
                </div>
            </div>

            <div className="mt-8">
                <Notes userid={user.id} />
            </div>
        </div>
    );
}
