import React from 'react'

const DashboardCard = (props) => {
  return (
    <div className={`p-2 bg-white rounded-sm shadow h-full ${props.relative && "relative"}`}>
        <p className='text-sm'>{props.title}</p>
      {props.children}
      <div className='flex justify-center'>
        <p className='text-sm '>{props.period}</p>
      </div>
      
    </div>
  )
}

export default DashboardCard
