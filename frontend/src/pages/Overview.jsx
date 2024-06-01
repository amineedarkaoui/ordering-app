import React from 'react'
import PerformanceCard from '../components/dashboard/PerformanceCard'
import DashboardCard from '../components/dashboard/DashboardCard'

const Overview = () => {
  return (
    <div className='grid gap-6'>
      <div className='grid grid-cols-4 gap-2'>
        <PerformanceCard title="monthly income" value="5000 dh" period="last 30 days" progress="13%" />
        <PerformanceCard title="monthly income" value="5000 dh" period="last 30 days" progress="13%" />
        <PerformanceCard title="monthly income" value="5000 dh" period="last 30 days" progress="13%" />
        <PerformanceCard title="monthly income" value="5000 dh" period="last 30 days" progress="13%" />
      </div>

      <div className='grid grid-cols-2-1 gap-2'>
        <div>
          <DashboardCard title="items sold">
            test
          </DashboardCard>
        </div>
        <div className='grid gap-2'>
          <PerformanceCard item={} title="monthly income" value="5000 dh" period="last 30 days" progress="13%" />
          <PerformanceCard item={} title="monthly income" value="5000 dh" period="last 30 days" progress="13%" />
        </div>
      </div>

      <div>

      </div>
    </div>
  )
}

export default Overview
