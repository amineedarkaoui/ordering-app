import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const Alert = (props) => {
  return (
    <div className={`flex left-1/2 transform -translate-x-1/2 font-medium items-center gap-2 px-12 py-3 fixed z-50 rounded-xl shadow-xl text-lg animate-alert ${props.error ? "bg-error-secondary text-error" : "bg-success-secondary text-success"} ${props.alertOut && "animate-alert-out"}`}>
      <Icon className='size-6' icon={props.error ? "material-symbols:error-outline" : "mdi:success-circle-outline"} />
      <p>{props.text}</p>
    </div>
  )
}

export default Alert
