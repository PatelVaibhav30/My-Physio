import React from 'react'
import AddPatient from '@/app/(component)/AddPatient'

const PatientPage = () => {
  return (
    <div className="max-w-[1250px] mx-auto px-6 py-6 border-2 rounded-md bg-white">
      <AddPatient />
      <div>
        Table here
      </div>
    </div>
  )
}

export default PatientPage