import React from 'react'

const DashboardCard = (props) => {
  return (
    <div className='p-2 bg-white rounded-sm shadow h-full'>
        <p className='text-sm'>{props.title}</p>
      {props.children}
    </div>
  )
}

export default DashboardCard
