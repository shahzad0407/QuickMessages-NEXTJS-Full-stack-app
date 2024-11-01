import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='w-full bg-black text-white font-semibold flex justify-around items-center'>
      Created By Shahzad
      <div className='flex justify-center items-center'>
        <Image alt='Github image' width={28} height={3} className=' bg-white border rounded-full' src='/github.png'></Image>
        <Link href=''>
        <span className='inline-block font-semibold text-white'>GitHub</span> 
        </Link>
      </div>
    </div>
  )
}

export default Footer
