import React, { useEffect, useState } from 'react'
import SliderContainer from '../components/SliderContainer'
import { getAllOrders, switchCancelOrder } from '../api'
import OrderSummary from '../components/OrderSummary'
import Alert from '../components/Alert'
import { showAlert } from '../utils'

const ConsultOrders = (props) => {
    const [orders, setOrders] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [errorAlert, setErrorAlert] = useState(false)    
    const [cancelAlert, setCancelAlert] = useState(false)
    const [uncancelAlert, setUncancelAlert] = useState(false)
    const [alertOut, setAlertOut] = useState(false)
    const [error, setError] = useState(false)
    const [update, setUpdate] = useState(0)



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
    }, [update])
  return (
    <SliderContainer switchCollapse={props.hide} orders={true} title="orders">
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
            <div className='mt-4  h-full overflow-scroll'>
                {orders.map(order => <OrderSummary 
                    update={() => setUpdate(prev => prev+1)} 
                    key={order.id} 
                    {...order} 
                    setLoading={setLoading} 
                    setOrders={setOrders}
                    error={() => showAlert(setErrorAlert, setAlertOut)}
                    showCancelAlert={() => showAlert(setCancelAlert, setAlertOut)}    
                    showUncancelAlert={() => showAlert(setUncancelAlert, setAlertOut)}    
                />)}
            </div>
            
        }
        {
            errorAlert &&
            <Alert alertOut={alertOut} error={true} text={`an error has occured, try again`} />}
        {
            cancelAlert &&
            <Alert alertOut={alertOut} text={`order has been canceled successfully`} />}
        {
            uncancelAlert &&
            <Alert alertOut={alertOut} text={`order has been uncanceled successfully`} />}
    </SliderContainer>
  )
}

export default ConsultOrders
