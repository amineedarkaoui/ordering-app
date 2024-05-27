import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const Counter = (props) => {
  return (
    <div className='flex items-center'>
        <button onClick={props.subtract} className='counter-btn'><Icon icon="bx:minus" /></button>
        <input 
            value={props.count} 
            className='w-8 text-center text-md'
            onFocus={(e) => e.target.select()}
            onChange={(e) => props.changeCount(e.target.value)}
            type='number'
        />
        <button onClick={props.add} className='counter-btn'><Icon icon="bx:plus" /></button>
    </div>
  )
}

export default Counter
