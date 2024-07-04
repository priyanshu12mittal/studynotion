import React from 'react'
import * as Icons from 'react-icons/vsc'
import { matchPath, NavLink, useLocation } from 'react-router-dom'

const SidebarLink = ({item}) => {

  const Icon = Icons[item.icon]
  const location = useLocation()

  const matchRoute = (route)=>{
    return matchPath({path:route},location.pathname)
  }

  return (
    <NavLink to={item.path} className={`${matchRoute(item.path)?" bg-yellow-800":" bg-opacity-0"} relative px-8 py-2 text-sm font-medium`}>
      <span
        className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${
          matchRoute(item.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>

      <div className=' items-center flex gap-x-2'>
        <Icon className="text-lg" />
        <span>
          {item.name}
        </span>
      </div>
    </NavLink>
  )
}

export default SidebarLink