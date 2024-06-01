import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const DashboardHeader = (props) => {
  return (
    <div className='grid gap-8'>
      <div>
      </div>
      <div>
        <p className='text-3xl font-medium'>{props.title}</p>
      </div>
    </div>
  )
}

export default DashboardHeader
