import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const Button = (props) => {
  return (
    <div onClick={props.onClick} className={`flex justify-center items-center p-1.5 px-4 rounded hover:cursor-pointer active:shadow-none gap-2 ${props.full && 'w-full'} ${props.fill && 'bg-black hover:shadow-lg hover:bord hover:bg-black'} active:opacity-75 ${props.fill!==true && "hover:bg-gray-500/5"} `} >
        <Icon className={props.fill ? "text-white" : "text-black"} icon={props.startIcon} /> 
        <p className={`${props.fill && 'text-white'}`}>{props.text}</p>
        <Icon className={props.fill ? "text-white" : "text-black"} icon={props.endIcon} /> 
    </div>
  )
}

export default Button
