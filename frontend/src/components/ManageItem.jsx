import { Icon } from '@iconify/react/dist/iconify.js'
import { IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { deleteItem } from '../api'
import PopUp from './PopUp'
import { showAlert } from '../utils'
import LoadingScreen from './LoadingScreen'

const ManageItem = (props) => {
    const [deleteItemPrompt, setDeleteItemPrompt] = useState(false)
    const [isLoading, setLoading] = useState(false)


    const removeItem = async () => {
        setLoading(true)
        const response = await deleteItem(props.item.id, props.item.name, props.item.price, props.item.category)
        setLoading(false)
        if (response instanceof Error) {
            showAlert(props.setErrorAlert, props.setAlertOut)
        } else {
            showAlert(props.deleteAlert, props.setAlertOut)
            props.update()
            setDeleteItemPrompt(false)
            
        } 
    }
  return (
    <div className='flex gap-4 items-center px-4 py-3 ml-8 border-l-2 border-gray-50'>
        <div className='flex items-center justify-between flex-1'>
            <div className='flex items-center gap-2'>
                <div className='relative w-16 rounded-3xl overflow-hidden aspect-square'>
                    {props.isLoading ?
                        <div role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                            <div class="flex items-center justify-center w-full h-full aspect-square bg-gray-300 ">
                                <svg class="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                            </div>
                        </div>
                        :
                        <img 
                            src={props.item.image} 
                            alt={`${props.item.name} image`} 
                            className='absolute top-0 h-full w-full object-cover group-hover:scale-110 transition-all duration-500 ease-out'
                        />
                    } 
                </div> 
                {
                    
                }
                {
                    props.isLoading ?
                    <div class="h-6 bg-gray-200 rounded-md w-48 animate-pulse"></div>
                    :
                    <p className='text-xl'>{props.item.name}</p>
                }
                
            </div>
            {
                props.isLoading ?
                <div class="h-5 bg-gray-200 rounded-md w-24 animate-pulse"></div>
                :
                <p className=' text-lg'>{props.item.price} dh</p>
            }
        </div>
        {
            props.isLoading ?
            <div className="flex gap-1">
                <div className='w-8 h-8 rounded-full bg-gray-200 animate-pulse'></div>
                <div className='w-8 h-8 rounded-full bg-gray-200 animate-pulse'></div>
            </div>
            :
            <div>
                <Tooltip title="edit item">
                    <IconButton onClick={() => props.updateItem(props.item)}>
                        <Icon className='text-black' icon="ic:outline-edit" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="delete item">
                    <IconButton onClick={() => setDeleteItemPrompt(true)}>
                        <Icon className='text-black' icon="ic:outline-delete" />
                    </IconButton>
                </Tooltip>
            </div>
        }

        {
            deleteItemPrompt &&
            <PopUp
                ok={removeItem}
                cancel={() => setDeleteItemPrompt(false)}
                okText={"delete"}
                cancelText={"cancel"}
            >
                <p className='text-2xl'>do you want to delete {props.item.name}?</p>
            </PopUp>
        }

        {
            isLoading &&
            <LoadingScreen />
        }
        </div>
  )
}

export default ManageItem
