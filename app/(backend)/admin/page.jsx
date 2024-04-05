import React from 'react'
import AdminHeader from './adminUI/AdminHeader'
import AdminDashboardPage from './adminUI/AdminDashboardPage'

const page = () => {
  return (
    <div>
        <AdminHeader/>

        <div className="flex flex-1 px-[10%]">
          <AdminDashboardPage/>
        </div>
    </div>
  )
}

export default page