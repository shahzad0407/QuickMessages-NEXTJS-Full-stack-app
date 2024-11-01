"use client"
import React, { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import ReactLoading from "react-loading";

const Navbar = () => {
    let session = useSession()

    if(session.status =="loading"){
        return <ReactLoading type="spin" color="#0000FF"
        height={100} width={50} />
    }

    return (
        <>
            <nav className=" flex justify-around md:justify-around items-center py-2  w-full border-b-1 border-black">

                <Link href='/'>
                    <h1 className='font-bold text-xl'>QuickMessages</h1>
                </Link>
                {session.status == "authenticated" ? <>
                <div className='flex flex-col items-center justify-center'>

                    <span className=''>Welcome</span>
                    <span className='font-semibold'>{session.data.user.username}</span>
                </div>
                    <button type="button" onClick={() => { signOut() }} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 md:px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Log out</button>
                </> :
                    <Link href='/sign-in'>
                        <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Login</button>
                    </Link>}


            </nav>
        </>
    )
}

export default Navbar
