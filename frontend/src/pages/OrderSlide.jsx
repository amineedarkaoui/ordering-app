import React, { useContext } from 'react'
import SliderContainer from '../components/SliderContainer'
import SliderOrder from '../components/SliderOrder'
import Button from '../components/Button'
import { showAlert } from '../utils'
import { OrderContext } from '../sections/MainSection'

const OrderSlide = (props) => {
  const {orderRequest} = useContext(OrderContext)
  return (
    <SliderContainer 
      title="order" 
      isCollapsed={props.isCollapsed} 
      switchCollapse={props.switchCollapse} 
      cancel={props.cancel}
    >
      <div className='flex flex-col justify-between h-full'>
      <div className="flex-grow overflow-y-scroll">
        {/* Content inside the scrollable div */}
        <div className="flex flex-col">
          {props.items.map(item => (
            props.isCollapsed ?
            <div className='relative rounded-3xl min-h-6 min-w-6 overflow-hidden aspect-square my-1 mx-[0.1vw]'>
              <img 
                  src={item.item.image} 
                  alt={`${item.item.name} image`} 
                  className='absolute top-0 h-full w-full object-cover group-hover:scale-110 transition-all duration-500 ease-out'
              />
            </div>
            :
            <SliderOrder {...item} key={item.id} />
          ))}
        </div>
      </div>
      {
        !props.isCollapsed &&
        <div className='grid gap-2'>
          <div className='flex items-end justify-between'>
            <p className='text-3xl'>total</p>
            <p className='text-2xl'>{props.total} dh</p>
          </div>
          <div className='flex gap-2'>
            <Button onClick={props.cancel} full={true} className="w-full flex-1" text="cancel" />
            <Button onClick={orderRequest} full={true} className="w-full flex-1" fill={true} text="place order" />
          </div>
        </div>
      }
        
      </div>
        
    </SliderContainer>
  )
}

export default OrderSlide
