import React from 'react'
import { navItems } from '../constants'
import NavbarItem from './NavbarItem'

const Navbar = () => {
  return (
    <div className='h-screen fixed top-0 left-0 w-[15vw] bg-white shadow-lg flex flex-col z-40'>
      <p className='mx-auto my-8 font-medium text-2xl'>dashboard</p>
      {navItems.map(item => 
        <NavbarItem {...item} key={item.text} />
      )}
    </div>
  )
}

export default Navbar
