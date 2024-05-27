import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import Button from './Button'
import { Icon } from '@iconify/react/dist/iconify.js'
import dayjs from 'dayjs'
import { formatCollapsedOrder, formatOrderDate } from '../utils'

const OrderSummary = (props) => {
    const [isExpanded, setExpanded] = useState(false)
  return (
    <div>
      <section className='flex justify-between items-center'>
        <p className='font-medium text-lg'>{formatOrderDate(dayjs(props.created))}</p>
        <IconButton>
            <Icon className='text-black' icon="ph:dots-three-bold" />
        </IconButton>
      </section>
        
      <section>
        {
            isExpanded ?
            <p>expand</p>
            :
            <p>{formatCollapsedOrder(props.sales)}</p>
        }
      </section>

      <section className='flex justify-between items-center'>
        <p>total {props.totalPrice} dh</p>
        <div> 
            text={`expand`} endIcon={`lets-icons:expand-down`} 
        </div>
      </section>
    </div>
  )
}

export default OrderSummary
