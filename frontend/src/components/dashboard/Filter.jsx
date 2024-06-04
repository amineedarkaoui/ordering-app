import React from 'react'

const Filter = (props) => {
  return (
    <div onClick={props.onClick} className={`transition-all active:scale-95 rounded-full py-1 px-2 text-md border-primary border-2 hover:cursor-pointer hover:shadow-sm ${props.isActive && "bg-primary"}`}>
      <p>{props.text}</p>
    </div>
  )
}

export default Filter
