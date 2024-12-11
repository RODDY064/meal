import Card from '@/app/ui/card'
import React from 'react'

// account page 


export default function Account() {
  return (
    <div className='mt-12 md:mt-24 flex flex-col items-center md:w-auto w-full'>
      <h1 className='text-4xl font-bold font-sans'>My Account</h1>
      <div className='w-full mt-24 px-4 md:w-[80%]  flex gap-6 flex-col items-center md:flex-row md:items-start'>
        <Card post={''}/>
      </div>

    </div>
  )
}
