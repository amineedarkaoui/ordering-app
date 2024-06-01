import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const PerformanceCard = (props) => {
  return (
    <div className='bg-white rounded-sm shadow p-2 flex flex-col gap-3'>
      <div>
        <p className='text-sm'>{props.title}</p>
      </div>
      <div>
        <p className='font-medium text-3xl'>{props.value}</p>
      </div>
      <div className='flex justify-between'>
        <p className='text-sm'>{props.period}</p>
        <div className='flex items-center text-sm gap-2 text-green-600'>
            <Icon icon="bxs:up-arrow" />
            <p>{props.progress}</p>
        </div>
      </div>
    </div>
  )
}

export default PerformanceCard
