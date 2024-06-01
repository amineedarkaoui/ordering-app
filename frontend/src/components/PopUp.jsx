import React from 'react'
import Button from './Button'
import { IconButton, Tooltip } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'

const PopUp = (props) => {
  return (
    <div className='bg-[#00000080] fixed top-0 left-0 h-screen w-screen z-40 flex justify-center items-center'>
      <div className='w-[90%] max-w-[500px] bg-white rounded-3xl grid gap-6 p-4 px-6 shadow-2xl animate-pop-up'>
        <div className='flex justify-between items-center'>
            <p></p>
            <Tooltip title="close">
                <IconButton  onClick={props.cancel}>
                    <Icon className='text-black text-xl' icon="bytesize:close" />
                </IconButton>
            </Tooltip>
        </div>
        {props.children}
        <div className='flex justify-end items-center gap-2 mt-4'>
            <Button onClick={props.cancel} text={props.cancelText}/>
            <Button onClick={props.ok} fill={true} text={props.okText}/>
        </div>
      </div>
    </div>
  )
}

export default PopUp
