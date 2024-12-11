import React from 'react'
import { cn } from '@/utils/cn'
import Image from 'next/image'

export default function Loader({ className, imageSize }: { className?: string,imageSize?:number }) {
  return (
    <div className={cn('w-full flex items-center justify-center gap-1',className)}>
     <Image src='/icons/loader.svg' alt='loader' width={imageSize || 30} height={imageSize || 30}/>
    </div>
  )
}
