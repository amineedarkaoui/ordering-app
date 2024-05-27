import React, { useEffect, useState } from 'react'
import SliderContainer from '../components/SliderContainer'
import { getAllOrders } from '../api'
import OrderSummary from '../components/OrderSummary'

const ConsultOrders = () => {
    const [orders, setOrders] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getData = async () => {
            const response = await getAllOrders()
            setLoading(false)
            if (response instanceof Error) {
                setError("error")
            } else {
                setOrders(response)
            } 
            }
        
            getData()
    }, [])
  return (
    <SliderContainer orders={true} title="orders">
        {
            isLoading ?
            <div role="status" class="max-w-sm animate-pulse mt-6">
                <div class="h-4 bg-gray-200 rounded-full w-48 mb-4"></div>
                <div class="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
                <br/>
                <br/>
                <div class="h-4 bg-gray-200 rounded-full w-48 mb-4"></div>
                <div class="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
                <br/>
                <br/>
                <div class="h-4 bg-gray-200 rounded-full w-48 mb-4"></div>
                <div class="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
                <br/>
                <br/>
                <div class="h-4 bg-gray-200 rounded-full w-48 mb-4"></div>
                <div class="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
                <br/>
            </div>
            :
            <div className='mt-4'>
                {orders.map(order => <OrderSummary key={order.id} {...order} />)}
            </div>
            
        }
    </SliderContainer>
  )
}

export default ConsultOrders
