import Link from 'next/link'
import React from 'react'
import RegisterForm from '../UI/RegisterForm'

const page = () => {
    return (
        <div className='flex flex-1 h-screen w-full items-center justify-center'>
            <div className='w-1/4'>
               <RegisterForm/>
            </div>
        </div>
    )
}

export default page