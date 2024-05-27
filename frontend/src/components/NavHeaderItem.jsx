import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { OrderContext } from '../sections/MainSection';

const NavHeaderItem = (props) => {
    const navigate = useNavigate();
    const {consultOrders, setConsultOrders} = useContext(OrderContext)

  return (
    <div
     className='flex items-center gap-1 text-xl hover:cursor-pointer'
     onClick={() => props.path!=="none" ? navigate(props.path) : setConsultOrders(true)}
     >
        <Icon icon={consultOrders && props.path==="none" ? props.fill : props.icon} />
        <p>{props.name}</p>
    </div>
  )
}

export default NavHeaderItem
