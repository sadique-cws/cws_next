import Link from 'next/link'
import React from 'react'
import LoginForm from '../UI/LoginForm'

const page = () => {
  return (
    <div className='flex flex-1 h-screen w-full items-center justify-center'>
        <div className='w-1/4'>
          <LoginForm/>
        </div>
    </div>
  )
}

export default page