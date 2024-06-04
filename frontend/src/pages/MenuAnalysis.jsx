import React, { useEffect, useState } from 'react'
import DashboardCard from '../components/dashboard/DashboardCard'
import PerformanceCard from '../components/dashboard/PerformanceCard'
import { getAllItems, getTopCategory, getTopItem } from '../api'
import LoadingScreen from '../components/LoadingScreen'
import Filter from '../components/dashboard/Filter'

const MenuAnalysis = () => {
  const [topItem, setTopItem] = useState(null)
  const [topCategory, setTopCategory] = useState(null)
  const [allItems, setAllItems] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [activeFilter, setActiveFilter] = useState(0)
  const [selectedItemId, setSelectedItemId] = useState(null)
  
  const [error, setError] = useState(false)
  const [alertOut, setAlertOut] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [chartLoading, setChartLoading] = useState(true)


  useEffect(() => {
    const getData = async () => {
        const topItem = await getTopItem()
        const topCategory = await getTopCategory()
        const items = await getAllItems()
        setLoading(false)
        if (topItem instanceof Error || topCategory instanceof Error) {
            showAlert(setError, setAlertOut)
        } else {
            setTopItem(topItem)
            setTopCategory(topCategory)
            setAllItems(items)
        } 
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
        const topItem = await getTopItem()
        const topCategory = await getTopCategory()
        const items = await getAllItems()
        setLoading(false)
        if (topItem instanceof Error || topCategory instanceof Error) {
            showAlert(setError, setAlertOut)
        } else {
            setTopItem(topItem)
            setTopCategory(topCategory)
            setAllItems(items)
        } 
    }
    getData()
  }, [])
  useEffect(() => {
    const getData = async () => {
        const topItem = await getTopItem()
        const topCategory = await getTopCategory()
        const items = await getAllItems()
        setChartLoading(false)
        if (topItem instanceof Error || topCategory instanceof Error) {
            showAlert(setError, setAlertOut)
        } else {
            setTopItem(topItem)
            setTopCategory(topCategory)
            setAllItems(items)
        } 
    }
    getData()
  }, [selectedItem, activeFilter])
  return !isLoading ? (
    <div className='grid gap-4'>
      
      <div className='grid grid-cols-1-2 gap-2'>
        <div className='grid gap-2'>
          <PerformanceCard {...topItem} title="top seller" period="last 30 days" progress="13%" />
          <PerformanceCard {...topCategory} title="top seller category" period="last 30 days" progress="13%" />
        </div>
        <DashboardCard title="menu items progress">
          <div className='flex flex-col justify-start items-start mt-2'>
            <div className='flex gap-2'>
              <select 
                className='select' 
                value={selectedItem} 
                onChange={(e) => {
                  setSelectedItemId(e.target.value)
                  setSelectedItem(allItems.find(item => item.id === e.target.value))
                }}
              >
                {allItems.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
              <Filter 
                onClick={() => setActiveFilter(0)} 
                text="last week" 
                isActive={activeFilter===0} 
              />
              <Filter 
                onClick={() => setActiveFilter(1)} 
                text="last month" 
                isActive={activeFilter===1} 
              />
              <Filter 
                onClick={() => setActiveFilter(2)} 
                text="last year" 
                isActive={activeFilter===2} 
              />
            </div>
          </div>
        </DashboardCard>
      </div>

      <div>

      </div>
    </div>
  ) : <LoadingScreen />
}

export default MenuAnalysis
