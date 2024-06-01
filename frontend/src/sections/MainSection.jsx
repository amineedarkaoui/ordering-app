import React, { createContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavHeader from '../components/NavHeader'
import PageHeader from '../components/PageHeader'
import OrderSlide from '../pages/OrderSlide'
import PopUp from '../components/PopUp'
import Alert from '../components/Alert'
import LoadingScreen from '../components/LoadingScreen'
import { placeOrder } from '../api'
import { showAlert } from '../utils'
import ConsultOrders from '../pages/ConsultOrders'
import { mainPageItems, navHeaderItems } from '../constants'

export const OrderContext = createContext(null)

const MainSection = () => {
  const [scrollPostion, setScrollPosition] = useState(0)
  const [orderItems, setOrderItems] = useState((localStorage.getItem("order") && JSON.parse(localStorage.getItem("order"))) || [])
  const [showOrder, setShowOrder] = useState(orderItems.length > 0 ? true : false)
  const [categoryName, setCategoryName] = useState("categories")
  const [totalPrice, setTotalPrice] = useState(0)
  const [cancelOrderPrompt, setCancelOrderPrompt] = useState(false)
  const [isSliderCollapsed, setSliderCollapse] = useState(false)
  const [orderSuccessAlert, setOrderSuccessAlert] = useState(false)
  const [errorAlert, setErrorAlert] = useState(false)
  const [alertOut, setAlertOut] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [consultOrders, setConsultOrders] = useState(false)

  const orderItem = (item) => {
    let exists = false
    orderItems.map(existingItem => {
      if (existingItem) {
        if(existingItem.item.name === item.name) {
        exists=true
        }
      }  
      return existingItem
    })

    if (exists) {
      incrementCount(item.id)
    } else {
      setOrderItems(prev => [
        ...prev,
        {item:item, count:1}
      ])
    }
    setShowOrder(true)
  }

  const incrementCount = (id) => {
    setOrderItems(prev => prev.map(item => {
      if (item.item.id === id) {
        return {...item, count: item.count+1}
      }
      return item
    }))
  }
  const decrementCount = (id) => {
    setOrderItems((prev) => prev.map(item => {
      if (item.item.id === id) {
        if (item.count > 1)
          return {...item, count: item.count-1}
        else
          removeItem(item.item.id)
      }
      return item
    }))
  }

  const removeItem = (id) => {
    setOrderItems(prev => prev.filter(item => item.item.id !== id))
  }

  const changeCount = (id, value) => {
    if (value < 1) removeItem(id)
    setOrderItems(prev => prev.map(item => {
      if (item.item.id === id) {
        return {...item, count: parseInt(value)}
      }
      return item
    }))
  }

  const calculateTotal = () => {
    let total = 0
    orderItems.forEach(item => {
      for (let i = 0; i<item.count; i++) {
        total += item.item.price
      }
    })
    setTotalPrice(total)
  }

  const cancelOrder = () => {
    setOrderItems([])
    setSliderCollapse(false)
    setShowOrder(false)
  }

  const orderRequest = async () => {
    setLoading(true)
    const response = await placeOrder(orderItems)
    setLoading(false)
      if (response instanceof Error) {
        showAlert(setErrorAlert, setAlertOut)
        console.log(response)
      } else {
        showAlert(setOrderSuccessAlert, setAlertOut)
        setOrderItems([])
        setShowOrder(false)
      } 
  }

  useEffect(() => {
    if (showOrder) {
      setConsultOrders(false)
    }
  }, [showOrder])

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(orderItems))
    calculateTotal()
  }, [orderItems])

  useEffect(() => {
    const handleScroll = (e) => {
      setScrollPosition(Math.floor(window.scrollY));
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return (
    <div className={`m-10 mx-10 md:mx-20 sm:mx-24 ${(showOrder || consultOrders) && "grid grid-cols-2fr-1fr"} ${isSliderCollapsed && "grid grid-cols-9fr-1fr"}`}>
      <OrderContext.Provider value={{orderItem, setCategoryName, incrementCount, decrementCount, changeCount, orderRequest, consultOrders, setConsultOrders}}>
      <section>
        {/* main content */}
        <section>
          {/* nav header */}
          <NavHeader 
            items={navHeaderItems} 
            small={showOrder || consultOrders} 
            medium={isSliderCollapsed && showOrder} 
            scroll={scrollPostion} 
            setConsultOrders={setConsultOrders}
            consultOrders={consultOrders}
          />
        </section>

        <section>
          {/* header */}
          <PageHeader text={categoryName} />
        </section>

        <section className='grid'>
          {/* content */}
          
            <Outlet />
         
        </section>
      </section>

      <section>
        {showOrder && 
         <OrderSlide
            cancel={() => setCancelOrderPrompt(true)} 
            total={totalPrice} 
            items={orderItems}
            isCollapsed={isSliderCollapsed}
            switchCollapse={() => setSliderCollapse(prev => !prev)}
          /> 
        }
        {
          consultOrders &&
          <ConsultOrders
            hide={() => setConsultOrders(false)}
          />
        }
      </section> 
      </OrderContext.Provider>

      {
        cancelOrderPrompt && 
        <PopUp 
          ok={() => {cancelOrder();setCancelOrderPrompt(false)}}
          cancel={() => setCancelOrderPrompt(false)} 
          okText={"cancel order"} 
          cancelText={"no"}
        >
          <p className='text-2xl'>do you want to cancel the order?</p>
        </PopUp>
        }

        {
          orderSuccessAlert &&
          <Alert alertOut={alertOut} text={`order has been placed successfully`} />
        }
        {
          errorAlert &&
          <Alert alertOut={alertOut} error={true} text={`an error has occured, try again`} />
        }

        {
          isLoading &&
          <LoadingScreen />
        }
        
      
    </div>
  )
}

export default MainSection
