import { Icon } from '@iconify/react/dist/iconify.js'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'

const SliderContainer = (props) => {
  return (
    <div className={`fixed right-0 top-0 h-screen bg-white w-[33vw] animate-slide z-30 shadow-2xl p-4 ${props.isCollapsed && "animate-collapse w-[8vw]"}`}>
        {/* first div */}
      <div className='flex justify-between items-center'>
        <div className={`flex justify-start items-center text-3xl gap-3 ${props.isCollapsed && "justify-center w-full mb-2"}`}>
            <Tooltip title={props.orders ? "close" : props.isCollapsed ? "expand" : "collapse"}>
                <IconButton onClick={props.switchCollapse}>
                    <Icon className={`text-3xl text-black ${props.isCollapsed && "rotate-180"} ${props.orders && "text-xl"}`} icon={props.orders ? "bytesize:close" : "ph:arrow-right-thin"} />
                </IconButton>
            </Tooltip>
            {
              !props.isCollapsed &&
              <p>{props.title}</p> 
            }
            
        </div>
        {
          !props.isCollapsed && !props.orders &&
          <Tooltip title="cancel">
              <IconButton onClick={props.cancel}>
                  <Icon className='text-black text-xl' icon="bytesize:close" />
              </IconButton>
          </Tooltip>
        }
        
        
      </div>

        {/* seconde div */}
      <div className='h-full pb-10'>
        {props.children}
      </div>
    </div>
  )
}

export default SliderContainer
