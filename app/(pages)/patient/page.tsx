import React from 'react'
import AddPatient from '@/app/(component)/AddPatient'
import PatientList from '@/app/(component)/PatientList'
import { Separator } from '@/components/ui/separator'

const PatientPage = () => {
  return (
    <div className="max-w-[1250px] mx-auto px-6 py-6 border-2 rounded-md bg-white">
      <h1 className='text-3xl font-semibold mb-6'>Patient details</h1>
      <AddPatient />
      <Separator className="my-4" />
      <div>
        <PatientList />
      </div>
    </div>
  )
}

export default PatientPage