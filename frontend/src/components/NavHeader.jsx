import React from 'react'
import { navHeaderItems } from '../constants'
import NavHeaderItem from './NavHeaderItem'

const NavHeader = (props) => {
  return (
    <div className={`fixed flex justify-end gap-6 w-[100%] px-12 py-4 top-0 left-0 z-20 transition-all ${props.scroll>50 && 'bg-white shadow-md'} ${props.small && "pr-33"} ${props.medium && "pr-8n"}`}>
      {navHeaderItems.map(item => (
        <NavHeaderItem 
            name={item.name} 
            icon={item.icon} 
            fill={item.fill}
            path={item.path}
        />
      ))}
    </div>
  )
}

export default NavHeader
