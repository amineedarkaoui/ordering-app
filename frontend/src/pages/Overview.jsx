import React, { useEffect, useState } from 'react'
import PerformanceCard from '../components/dashboard/PerformanceCard'
import DashboardCard from '../components/dashboard/DashboardCard'
import { getAvgOrderPrice, getIncomeProgress, getMonthlyIncome, getMonthlyOrders, getPeakDay, getTopCategory, getTopItem, getTopItems } from '../api'
import LoadingScreen from '../components/LoadingScreen'
import { BarChart, LineChart } from '@mui/x-charts'
import { formatWeekDay, getIncomeProgressData, showAlert } from '../utils'
import Alert from '../components/Alert'

const Overview = () => {
  const [topItem, setTopItem] = useState(null)
  const [topCategory, setTopCategory] = useState(null)
  const [topItemsData, setTopItemsData] = useState(null)
  const [monthlyIncome, setMonthlyIncome] = useState(null)
  const [monthlyOrders, setMonthlyorders] = useState(null)
  const [peakDay, setPeakDay] = useState(null)
  const [AvgOrderPrice, setAvgOrderPrice] = useState(null)
  const [incomeProgressData, setIncomeProgressData] = useState(null)
  const [error, setError] = useState(false)
  const [alertOut, setAlertOut] = useState(false)
  const [isLoading, setLoading] = useState(true)



  useEffect(() => {
    const getData = async () => {
        const topItem = await getTopItem()
        const topCategory = await getTopCategory()
        const topItems = await getTopItems()
        const income = await getMonthlyIncome()
        const orders = await getMonthlyOrders()
        const orderPrice = await getAvgOrderPrice()
        const peakDay = await getPeakDay()
        const incomeData = await getIncomeProgress()
        setLoading(false)
        if (topItem instanceof Error || topCategory instanceof Error) {
            showAlert(setError, setAlertOut)
        } else {
            setTopItem(topItem)
            setTopCategory(topCategory)
            setTopItemsData(topItems)
            setMonthlyIncome(income)
            setMonthlyorders(orders)
            setAvgOrderPrice(orderPrice)
            setPeakDay(peakDay)
            setIncomeProgressData(getIncomeProgressData(incomeData))
        } 
    }

    getData()
  }, [])

  const valueFormatter = (value) => `${value} sales`;
  const incomeValueFormatter = (value) => `${value} dh`;
  return (
    <div className='grid gap-4'>
      <div className='grid grid-cols-4 gap-2'>
        <PerformanceCard title="monthly income" value={`${monthlyIncome} dh`} period="last 30 days" progress="13%" />
        <PerformanceCard title="monthly orders" value={`${monthlyOrders} orders`} period="last 30 days" progress="13%" />
        <PerformanceCard title="average order value" value={`${AvgOrderPrice} dh`} period="last 30 days" progress="13%" />
        <PerformanceCard title="peak day" value={formatWeekDay(peakDay?.day - 1)} period="last 30 days" progress={null} num={peakDay?.ordersNum} />
      </div>

      <div className='grid grid-cols-2-1 gap-2'>
        <div>
          <DashboardCard title="items sold" period="last 30 days">
            {
              !isLoading &&
              <BarChart 
                height={300}
                dataset={topItemsData}
                xAxis={[{ scaleType: 'band', dataKey: 'name' }]}
                series={[{ dataKey: 'count', label: 'number of sales', valueFormatter }]}
                borderRadius={5}
                colors={[""]}
              />
            }
          </DashboardCard>
        </div>
        <div className='grid gap-2'>
          <PerformanceCard {...topItem} title="top seller" period="last 30 days" progress="13%" />
          <PerformanceCard {...topCategory} title="top seller category" period="last 30 days" progress="13%" />
        </div>
      </div>

      <div>
        
        <DashboardCard title="global income" period="current year">
          {
            !isLoading &&
            <LineChart
              xAxis={[{ data: incomeProgressData.months, scaleType: 'point'}]}
              series={[
                {
                  data: incomeProgressData.values,
                  valueFormatter:incomeValueFormatter,
                },
              ]}
              height={300}
              colors={['black']}
            />
          }
          
        </DashboardCard>
      </div>

      {
          error &&
          <Alert alertOut={alertOut} error={true} text={`an error has occured, try again`} />
        }

      {
        isLoading &&
        <LoadingScreen />
      }
    </div>
  )
}

export default Overview
