import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const PerformanceCard = (props) => {
  return (
    <div className={`bg-white rounded-sm shadow p-2 gap-4 items-center ${props.count ? 'grid grid-cols-1-2' : ""}`}>
      {
        props.count &&
          <div className='relative rounded-full overflow-hidden aspect-square max-w-[100px] min-w-[100px] my-auto justify-self-center'>
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
                  src={props?.item?.image || props?.category?.image} 
                  alt={`${props?.item?.name || props?.category?.name} image`}
                  className='absolute top-0 h-full w-full object-cover group-hover:scale-110 transition-all duration-500 ease-out'
              />
            } 
          </div>
      }

      <div className='flex flex-col gap-2 justify-between h-full'>
      <div>
        <p className='text-sm'>{props.title}</p>
      </div>
        {
          props.count || props.num ?
          <div>
            <p className='font-medium text-3xl'>{props?.item?.name || props?.category?.name || props?.value}</p>
            <p>{props.count ? `${props.count} sales` : `${props.num} orders`}</p>
          </div>
          :
          <p className='font-medium text-3xl'>{props.value}</p>
        }
      <div className='flex justify-between'>
        <p className='text-sm'>{props.period}</p>
        <div className='flex items-center text-sm gap-2 text-green-600'>
            <Icon icon="bxs:up-arrow" />
            <p>{props.progress}</p>
        </div>
      </div>
    </div>
    
    </div>
  )
}

export default PerformanceCard
