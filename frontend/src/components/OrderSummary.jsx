import { IconButton, Menu, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import dayjs from 'dayjs'
import { formatCollapsedOrder, formatExtendedOrder, formatOrderDate } from '../utils'
import { switchCancelOrder } from '../api'
import PopUp from './PopUp'

const OrderSummary = (props) => {
    const [isExpanded, setExpanded] = useState(false)
    const [cancelOrderPrompt, setCancelOrderPrompt] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const cancelOrder = async () => {
        props.setLoading(true)
        const response = await switchCancelOrder(props.id)
        props.setLoading(false)
        if (response instanceof Error) {
            props.error()
        } else {
            props.update()
            if (response === false) 
              props.showUncancelAlert()
            else 
              props.showCancelAlert()
        } 
    }

  return (
    <div className={`grid py-4 ${ props.canceled && "opacity-30"}`}>
      <section className='flex justify-between items-center'>
        <p className='font-medium text-xl'>{formatOrderDate(dayjs(props.created))} {props.canceled && "canceled"}</p>
        <IconButton onClick={handleClick}>
            <Icon className='text-black' icon="ph:dots-three-bold" />
        </IconButton>
      </section>
        
      <section>
        {
            isExpanded ?
            formatExtendedOrder(props.sales).map(line => (
                <div className='flex justify-between mr-8'>
                    <p className='text-lg'>{line.text}</p>
                    <p className='text-lg'>{line.price} dh</p>
                </div>
            ))
            :
            <p className='text-lg'>{formatCollapsedOrder(props.sales)}</p>
        }
      </section>

      <section className='flex justify-between items-end'>
        <p className='font-medium text-lg'>total {props.totalPrice} dh</p>
        <div onClick={() => setExpanded(prev => !prev)} className='flex items-center hover:cursor-pointer'> 
            <p className='font-medium'>{isExpanded ? "collapse" : "expand"}</p> 
            <Icon className={`size-5 text-black ${isExpanded && "rotate-180"}`} icon={`lets-icons:expand-down`} />
        </div>
      </section>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => {
            if (props.canceled)
                cancelOrder()
            else
                setCancelOrderPrompt(true); 
            handleClose()
        }}>
            {props.canceled ? "uncancel order" : "cancel order"}
        </MenuItem>
      </Menu>
      {
        cancelOrderPrompt &&
        <PopUp 
            ok={() => {cancelOrder();setCancelOrderPrompt(false)}}
            cancel={() => setCancelOrderPrompt(false)} 
            okText={"cancel order"} 
            cancelText={"no"}
        >
            <p className='text-2xl'>do you want to cancel the order?</p>
        </PopUp>
      }
      
    </div>
  )
}

export default OrderSummary
