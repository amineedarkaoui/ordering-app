import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const NavbarItem = (props) => {
  return (
    <NavLink 
        to={props.path}
        className={({isActive}) => `flex px-4 py-3 hover:bg-gray-50 rounded-lg transition-all items-center gap-2 text-lg ${isActive && "bg-gray-100"}`}
    >
        <Icon icon={props.icon} />
        <p>{props.text}</p>
    </NavLink>
  )
}

export default NavbarItem
