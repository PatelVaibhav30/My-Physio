"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Notes from '@/app/(component)/Notes'
import { useIsMobile } from '@/hooks/use-mobile'
import DashboardMobile from './DashboardMobile'

interface DashboardClientProps {
  patientCount: number
  settledEarning: number
  unsettledEarning: number
  userId: string
}

export default function DashboardClient({
  patientCount,
  settledEarning,
  unsettledEarning,
  userId,
}: DashboardClientProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <DashboardMobile
        patientCount={patientCount}
        settledEarning={settledEarning}
        unsettledEarning={unsettledEarning}
        userId={userId}
      />
    )
  }

  return (
    <div className="mx-auto px-6 py-6 border-2 rounded-md bg-white max-w-6xl">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Link href="/patient">
          <div className="flex flex-col items-center justify-center rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer p-3 shadow-md bg-blue-100">
            <Image height={50} width={50} src="/patient.png" alt="patient" />
            <span className="text-3xl font-extrabold text-blue-700">{patientCount}</span>
            <h1 className="text-sm font-medium text-gray-600 text-center mt-1">TOTAL PATIENTS</h1>
          </div>
        </Link>

        <div className="flex flex-col items-center justify-center rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer p-3 shadow-md bg-blue-100">
          <Image height={50} width={50} src="/settled.png" alt="settled earnings" />
          <span className="text-3xl font-extrabold text-blue-700">₹{settledEarning}</span>
          <h1 className="text-sm font-medium text-gray-600 text-center mt-1">TOTAL EARNINGS</h1>
        </div>

        <div className="flex flex-col items-center justify-center rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer p-3 shadow-md bg-blue-100">
          <Image height={50} width={50} src="/unsettled.png" alt="unsettled amount" />
          <span className="text-3xl font-extrabold text-blue-700">₹{unsettledEarning}</span>
          <h1 className="text-sm font-medium text-gray-600 text-center mt-1">UNSETTLED AMOUNT</h1>
        </div>
      </div>

      <div className="mt-8">
        <Notes userid={userId} />
      </div>
    </div>
  )
}
