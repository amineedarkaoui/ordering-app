import React from 'react'
import {mainPageItems} from "../constants/index"
import PageCard from '../components/PageCard'

const MenuPage = () => {
  return (
    <section className='gap-x-12 max-md:gap-x-4 gap-y-6 w-screen h-screen justify-center items-center flex max-sm:flex-col-reverse'>
        {mainPageItems.map(item => (
          <PageCard name={item.name} icon={item.icon} path={item.path} />
        ))}
    </section>
  )
}

export default MenuPage
