import { getPatientCount, getSettledEarning, getUnsettledEarning } from '@/action/dashboardAction';
import { createUser } from '@/action/userAction';
import Notes from '@/app/(component)/Notes';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    const user = await createUser(session?.user?.name || "Anonymous", session?.user?.email || "anonymous@example.com", "");


    const patientCount = await getPatientCount(session?.user?.email);
    const settledEarning = await getSettledEarning(session?.user?.email);
    const unsettledEarning = await getUnsettledEarning(session?.user?.email);

    return (
        <div className="mx-auto px-6 py-6 border-2 rounded-md bg-white">
            <h1 className='text-3xl font-semibold mb-6'>Dashboard</h1>
            <div className='grid grid-cols-3 gap-6'>
                <Link href="/patient">
                    <div className='flex flex-col items-center justify-center rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer p-3 shadow-md bg-blue-100'>

                        <Image height={50} width={50} src="/patient.png" alt='patient' />
                        <span className='text-3xl font-extrabold text-blue-700'>{patientCount}</span>
                        <h1 className="text-sm font-medium text-gray-600 text-center mt-1">TOTAL PATIENTS</h1>
                    </div>
                </Link>

                <div className='flex flex-col items-center justify-center rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer p-3 shadow-md bg-blue-100'>
                    <Image height={50} width={50} src="/settled.png" alt='patient' />
                    <span className='text-3xl font-extrabold text-blue-700'>₹{settledEarning}</span>
                    <h1 className="text-sm font-medium text-gray-600 text-center mt-1">TOTAL EARNINGS</h1>
                </div>

                <div className='flex flex-col items-center justify-center rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer p-3 shadow-md bg-blue-100'>
                    <Image height={50} width={50} src="/unsettled.png" alt='patient' />
                    <span className='text-3xl font-extrabold text-blue-700'>₹{unsettledEarning}</span>
                    <h1 className="text-sm font-medium text-gray-600 text-center mt-1">UNSETTLED AMOUNT</h1>
                </div>
            </div>

            <div className="mt-8">
                <Notes userid={user.id} />
            </div>
        </div>
    );
}
