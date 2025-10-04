import Calender from '@/app/(component)/Calender'
import React from 'react'

const page = () => {
  return (
    <div className="max-w-[1250px] mx-auto px-6 py-6 border-2 rounded-md bg-white">
      <h1 className='text-3xl font-semibold mb-6'>Visit</h1>

      <div>
        <Calender />
      </div>
    </div>
  )
}

export default page