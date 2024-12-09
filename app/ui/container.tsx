"use client"
import React from 'react'
import Search from './search'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Container() {

    useGSAP(()=>{

     gsap.registerPlugin(useGSAP);

    gsap.to('.container', {
        opacity: 1,
        duration: 1,
        delay: 1.7
     
    })
    })


  return (
    <div className='mt-12 w-full flex flex-col items-center container opacity-0'>
    <Search/>
        Container
    </div>
  )
}
