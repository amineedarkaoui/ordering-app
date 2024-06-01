import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import DashboardHeader from '../components/DashboardHeader'
import { getTitle } from '../utils'
import NavHeader from '../components/NavHeader'
import { dashboardHeaderItems } from '../constants'

const DashboardSection = () => {
    const path = useLocation().pathname
    const [scrollPostion, setScrollPosition] = useState(0)




    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        const position = Math.ceil(
            (scrollTop / (scrollHeight - clientHeight)) * 100
        );
        setScrollPosition(position);
    };
    
  return (
    <div onScroll={handleScroll} className='bg-primary3 h-screen w-screen top-0 left-0 overflow-x-hidden'>
      <div className='grid grid-cols-dashboard'>
        <div>
            <Navbar />
        </div>
        
        <div className='p-6 flex flex-col gap-6'>
            <NavHeader items={dashboardHeaderItems} scroll={scrollPostion} />
            <DashboardHeader title={getTitle(path)} />
            <Outlet />
        </div>
        
      </div>
    </div>
  )
}

export default DashboardSection
