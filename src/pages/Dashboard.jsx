import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/dashboard/Sidebar'

const Dashboard = () => {

  const {loading:authLoading} = useSelector((state)=>state.auth)
  const {loading:profileLoading} = useSelector((state)=>state.profile)

  if(profileLoading || authLoading){
    return (
      <div>
        Loading ...
      </div>
    )
  }

  return (
    <div className=' flex w-[100%]'>
      <Sidebar />
      <div className=' h-[calc(100vh-3.5rem)] overflow-auto w-full'>
        <div className=' mx-auto h-full w-11/12 max-w-[1000px] py-10'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard