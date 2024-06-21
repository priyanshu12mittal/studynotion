import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children, active, linkto,className}) => {
  return (
    <Link to={linkto}>
        <div className={` ${className} flex w-fit text-lg font-inter px-6 py-3 rounded-md font-medium ${ active ? 'bg-yellow-50 text-richblack-800':'bg-richblack-800 text-white'} hover:scale-95 transition-all duration-200`} style={{
          boxShadow: `-3px -3px 0px 0px rgba(255, 255, 255, ${
            active ? 0.51 : 0.18
          }) inset`,
        }}>
            {children}
        </div>
    </Link>
  )
}

export default CTAButton