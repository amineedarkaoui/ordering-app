import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { OrderContext } from '../sections/MainSection'

const CategoryCard = (props) => {
    const navigate = useNavigate()
    const {setCategoryName} = useContext(OrderContext)

    const goToItem = () => {
      setCategoryName(props.name)
      !props.isLoading && navigate(`/category/${props.id}/items`)
    }
  return (
    <div onClick={goToItem}
     className='w-full max-w-64 justify-self-center flex flex-col justify-start transition-all bg-white shadow-md rounded-[30px] p-2 group hover:cursor-pointer'>
      
    <div className='relative rounded-3xl overflow-hidden aspect-square'>
      {props.isLoading ?
        <div role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
            <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 ">
                <svg class="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                </svg>
            </div>
        </div>
        :
        <img 
            src={props.image} 
            alt={`${props.name} image`} 
            className='absolute top-0 h-full w-full object-cover group-hover:scale-110 transition-all duration-500 ease-out'
        />
      } 
    </div>
      
    {props.isLoading ?
      <div role="status" class="max-w-sm rounded animate-pulse">
        <div class="h-2.5 bg-gray-200 rounded-full w-32 mb-2.5"></div>
        <div class="w-48 h-2 mb-10 bg-gray-200 rounded-full"></div>
      </div>
      :
      <div className='p-2 pt-4 flex-1 flex flex-col items-start justify-center'>
          <div className='flex text-3xl items-center justify-between w-full'>
            <p>{props.name}</p>
            <Icon className='group-hover:rotate-[-45deg] transition-all' icon="cil:arrow-right" />
          </div>
       
        
        <p className='text-gray-600 text-sm'>{props.itemsNum} items</p>
      </div> 
    } 
    </div>
  )
}

export default CategoryCard
