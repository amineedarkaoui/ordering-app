import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageCard = (props) => {
  const navigate = useNavigate()

  return (
    <div 
    onClick={() => navigate(props.path)}
     className='active:shadow-sm hover:cursor-pointer flex flex-col justify-around items-center p-8 gap-8 rounded-3xl bg-primary shadow-lg min-w-[300px] max-w-[400px] w-0-[90%] group'
    >
      <Icon className='transition-all ease-in-out size-40 group-hover:scale-105 t' icon={props.icon} />
      <div className='flex items-center gap-2'>
        <p className='text-4xl font-medium'>{props.name}</p>
        <Icon className='size-8 group-hover:rotate-[-45deg] transition-all ease-in-out' icon="tabler:arrow-right"/>
      </div>
    </div>
  )
}

export default PageCard
