import { Icon } from '@iconify/react/dist/iconify.js'
import { IconButton } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageHeader = (props) => {
    const navigate = useNavigate()
  return (
    <div className='mt-16 text-4xl flex justify-start items-center gap-4'>
      <IconButton>
        <Icon 
            onClick={() => navigate(-1)} 
            className='text-black text-3xl' 
            icon="fluent-mdl2:back" 
        />
      </IconButton>
      <p>{props.text}</p>
    </div>
  )
}

export default PageHeader
