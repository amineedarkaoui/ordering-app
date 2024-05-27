import React, { useContext } from 'react'
import Counter from './Counter'
import { OrderContext } from '../sections/MainSection'

const SliderOrder = (props) => {
    const {incrementCount, decrementCount, changeCount} = useContext(OrderContext)
  return (
    <div className='flex justify-between items-center w-full py-4'>
      <div className='flex justify-start items-start gap-2'>
        <div className='relative rounded-3xl min-h-20 min-w-20 overflow-hidden aspect-square'>
            <img 
                src={props.item.image} 
                alt={`${props.item.name} image`} 
                className='absolute top-0 h-full w-full object-cover group-hover:scale-110 transition-all duration-500 ease-out'
            />
        </div>
        <div>
            <p className='text-xl'>{props.item.name}</p>
            <p>{props.item.price} dh</p>
        </div>
      </div>
      <Counter 
        count={props.count} 
        add={() => incrementCount(props.item.id)} 
        subtract={() => decrementCount(props.item.id)} 
        changeCount={(value) => changeCount(props.item.id, value)}
    />
    </div>
  )
}

export default SliderOrder
