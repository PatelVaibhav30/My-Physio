"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Notes from '@/app/(component)/Notes'
import { useIsMobile } from '@/hooks/use-mobile'

interface DashboardMobileProps {
  patientCount: number
  settledEarning: number
  unsettledEarning: number
  userId: string
}

export default function DashboardMobile({
  patientCount,
  settledEarning,
  unsettledEarning,
  userId,
}: DashboardMobileProps) {
  const isMobile = useIsMobile()

  if (!isMobile) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 md:hidden">
      <div className="mx-auto max-w-xl space-y-6">
        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                Dashboard
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-950">
                Mobile overview
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Monitor patients, earnings, and notes from your phone.
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50">
              <Image src="/patient.png" alt="Mobile dashboard icon" width={34} height={34} />
            </div>
          </div>
        </section>

        <section className="grid gap-4">
          <Link href="/patient" className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Total patients</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950">{patientCount}</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                <Image src="/patient.png" alt="Patient icon" width={32} height={32} />
              </div>
            </div>
          </Link>

          <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total earnings</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">₹{settledEarning}</p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Unsettled amount</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">₹{unsettledEarning}</p>
          </div>
        </section>

        <section className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Quick notes</h2>
              <p className="text-sm text-slate-500">Add and review reminders on the go.</p>
            </div>
          </div>
          <Notes userid={userId} />
        </section>
      </div>
    </div>
  )
}
