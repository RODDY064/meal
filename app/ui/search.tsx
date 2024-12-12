"use client"
import { useBoundStore } from '@/store/store'
import React from 'react'

export default function Search() {

  const {search,setSearch} = useBoundStore()


  return (
    <input 
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder='Search for a recipes by name or tag...'
    className='w-[90%] md:w-[35rem] py-2 bg-white/40 border-[1.5px] focus:outline-none focus:border-primary-orange/50  border-primary-orange/30  rounded-xl my-2 p-4'/>
  )
}
