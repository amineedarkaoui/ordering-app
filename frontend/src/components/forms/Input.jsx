import React from 'react'
import FieldError from '../FieldError'

const Input = (props) => {
  return (
    <div className='w-full flex flex-col items-start'>
      <label className='pl-2 font-medium' for={props.id}>{props.label}</label>
      <input 
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
        type={props.type}
        onFocus={props.onFocus}
        className='border-black border-2 rounded-md h-12 w-full text-xl p-2 focus:border-[3px]'
      />
      <FieldError text={props.error} />
    </div>
  )
}

export default Input
