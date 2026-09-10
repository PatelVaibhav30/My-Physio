"use client"

import Link from 'next/link'
import React from 'react'
import Notes from '@/app/(component)/Notes'
import { ArrowUpRight, ClipboardList, IndianRupee, Plus, WalletCards } from 'lucide-react'

interface DashboardClientProps {
  displayName: string
  patientCount: number
  settledEarning: number
  unsettledEarning: number
  userId: string
}

export default function DashboardClient({
  displayName,
  patientCount,
  settledEarning,
  unsettledEarning,
  userId,
}: DashboardClientProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-2xl bg-[#173d35] px-5 py-6 text-white shadow-lg sm:px-8 sm:py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Practice overview</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Good day, {displayName.split(' ')[0]}</h1>
            <p className="mt-2 max-w-md text-sm leading-6 text-emerald-50/75">Keep today&apos;s patient care and practice finances moving forward.</p>
          </div>
          <Link href="/patient" className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#e3b85c] px-4 py-2.5 text-sm font-semibold text-[#173d35] transition hover:bg-[#f0ca75]">
            <Plus size={17} /> Add patient
          </Link>
        </div>
      </section>

      <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/patient" className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700"><ClipboardList size={20} /></span>
            <ArrowUpRight className="text-slate-300 transition group-hover:text-emerald-600" size={19} />
          </div>
          <p className="mt-7 text-sm font-medium text-slate-500">Total patients</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">{patientCount}</p>
          <p className="mt-2 text-xs text-emerald-700">View patient list</p>
        </Link>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-700"><IndianRupee size={20} /></span>
          <p className="mt-7 text-sm font-medium text-slate-500">Settled earnings</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">₹{settledEarning}</p>
          <p className="mt-2 text-xs text-slate-400">Collected from completed visits</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50 text-rose-700"><WalletCards size={20} /></span>
          <p className="mt-7 text-sm font-medium text-slate-500">Unsettled amount</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">₹{unsettledEarning}</p>
          <p className="mt-2 text-xs text-rose-600">Needs your attention</p>
        </div>
      </section>

      <section className="mt-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Workspace</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">Quick notes</h2>
          </div>
          <p className="text-sm text-slate-500">Your reminders, in one place</p>
        </div>
        <Notes userid={userId} />
      </section>
    </div>
  )
}
