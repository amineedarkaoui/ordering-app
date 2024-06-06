import { Icon } from '@iconify/react/dist/iconify.js'
import dayjs from 'dayjs'
import React from 'react'

const YearCount = (props) => {
  return (
    <div className='flex items-center'>
      <button onClick={() => {props.count>0 && props.subtract()}} className={`year-btn ${props.count <= 0 && "disabled"}`}><Icon icon="ep:arrow-left-bold" /></button>
        <input 
            value={props.count} 
            className='w-14 text-center text-lg'
            onFocus={(e) => e.target.select()}
            onChange={(e) => props.changeCount(e.target.value)}
            type='number'
        />
        <button onClick={() => {props.count<dayjs().year() && props.add()}} className={`year-btn ${props.count >= dayjs().year() && "disabled"}`}><Icon icon="ep:arrow-right-bold" /></button>
    </div>
  )
}

export default YearCount
