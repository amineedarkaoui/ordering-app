import { Icon } from '@iconify/react/dist/iconify.js'
import { IconButton, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { showAlert } from '../utils'
import ManageItem from './ManageItem'
import { deleteCategory, getCategoryItems } from '../api'
import PopUp from './PopUp'
import Alert from './Alert'
import ItemForm from './forms/ItemForm'

const ManageCategory = (props) => {
    const [items, setItems] = useState(null)
    const [update, setUpdate] = useState(0)
    const [isExpanded, setExpanded] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [errorAlert, setErrorAlert] = useState(false)    
    const [alertOut, setAlertOut] = useState(false)
    const [deleteCategoryPrompt, setDeleteCategoryPrompt] = useState(false)
    const [showItemForm, setShowItemForm] = useState(false)
    const [itemSuccess, setItemSuccess] = useState(false)
    const [item, setItem] = useState(null)
    const [itemUpdateSuccess, setItemUpdateSuccess] = useState(false)
    const [itemDeleteAlert, setItemDeleteAlert] = useState(false)
 

    const removeCategory = async () => {
        setLoading(true)
        const response = await deleteCategory(props.category.id)
        if (response instanceof Error) {
            showAlert(setErrorAlert, setAlertOut)
        } else {
            props.update()
            setDeleteCategoryPrompt(false)
            props.deleteAlert()
            setLoading(false)
        } 
    }
    

    useEffect(() => {
        const getData = async () => {
            const response = await getCategoryItems(props.category.id)
            if (response instanceof Error) {
                console.log(response)
                showAlert(setErrorAlert, setAlertOut)
            } else {
                setItems(response)
                setLoading(false)
            } 
        }
        if (isExpanded)
            getData()
    }, [update, isExpanded])

  return (
    <div className='bg-white w-full shadow rounded-sm'>
      <div className='flex gap-4 items-center px-4 py-3'>
        <div className='flex items-center justify-between flex-1'>
            <div className='flex items-center gap-2'>
                <div className='relative w-16 rounded-xl overflow-hidden aspect-square'>
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
                            src={props.category.image} 
                            alt={`${props.category.name} image`} 
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
                    <p className='text-xl'>{props.category.name}</p>
                }
                
            </div>
            {
                props.isLoading ?
                <div class="h-5 bg-gray-200 rounded-md w-24 animate-pulse"></div>
                :
                <p className='text-gray-600 text-md'>{props.category.itemsNum} items</p>
            }
        </div>
        {
            props.isLoading ?
            <div className="flex gap-1">
                <div className='w-8 h-8 rounded-full bg-gray-200 animate-pulse'></div>
                <div className='w-8 h-8 rounded-full bg-gray-200 animate-pulse'></div>
                <div className='w-8 h-8 rounded-full bg-gray-200 animate-pulse'></div>
                <div className='w-8 h-8 rounded-full bg-gray-200 animate-pulse'></div>
            </div>
            :
            <div>
                <Tooltip title="add item">
                    <IconButton onClick={() => setShowItemForm(true)}>
                        <Icon className='text-black' icon="ic:baseline-plus" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="edit category">
                    <IconButton onClick={() => props.editCategory(props.category)}>
                        <Icon className='text-black' icon="ic:outline-edit" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="delete category">
                    <IconButton onClick={() => setDeleteCategoryPrompt(true)}>
                        <Icon className='text-black' icon="ic:outline-delete" />
                    </IconButton>
                </Tooltip>
                <Tooltip title={isExpanded ? "hide items" : "show items"}>
                    <IconButton onClick={() => {
                        if(!isExpanded){
                            setLoading(true)
                            setExpanded(true)
                        } else
                            setExpanded(false)
                    }}>
                        <Icon className={`text-black transition-all ${isExpanded && "rotate-180"}`} icon="lets-icons:expand-down" />
                    </IconButton>
                </Tooltip>
                
                
                
                
            </div>
        }
        
      </div>

        {
            isExpanded &&
            (
                isLoading ?
                <div>
                    <ManageItem isLoading={true} />
                </div>
                :
                items.length > 0 ?
                items.map(item => <ManageItem 
                    item={item} 
                    key={item.id} 
                    setAlertOut={setAlertOut}
                    setErrorAlert={setErrorAlert}
                    update={() => {props.update(); setUpdate(prev=>prev+1)}}
                    deleteAlert={setItemDeleteAlert}
                    setLoading={setLoading}
                    updateItem={(item) => {setItem(item); setShowItemForm(true)}}
                />)
                :
                <div className='flex pb-2'>
                    <p className='m-auto text-gray-500'>no items yet</p>
                </div>
                
            )
        }

        {
            deleteCategoryPrompt &&
            <PopUp
                ok={removeCategory}
                cancel={() => setDeleteCategoryPrompt(false)}
                okText={"delete"}
                cancelText={"cancel"}
            >
                <p className='text-2xl'>do you want to delete {props.category.name} and all its items?</p>
            </PopUp>
        }

        {
        showItemForm && 
            <ItemForm 
                cancel={() => setShowItemForm(false)} 
                success={setItemSuccess}
                editSuccess={setItemUpdateSuccess}
                error={setErrorAlert}
                setAlertOut={setAlertOut}
                update={() => {props.update(); setUpdate(prev=>prev+1)}}
                item={item}
                resetItem={() => setItem(null)}
                category={props.category}
                updateSuccess={setItemUpdateSuccess}
            />
        }

        {
          errorAlert &&
          <Alert alertOut={alertOut} error={true} text={`an error has occured, try again`} />
        }
        {
          itemSuccess &&
          <Alert alertOut={alertOut} text={`new item added`} />
        }
        {
          itemUpdateSuccess &&
          <Alert alertOut={alertOut} text={`item updated successfully`} />
        }
        {
          itemDeleteAlert &&
          <Alert alertOut={alertOut} text={`item deleted successfully`} />
        }

    </div>
  )
}

export default ManageCategory
