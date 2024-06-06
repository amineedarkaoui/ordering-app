import React, { useEffect, useState } from 'react'
import DashboardCard from '../components/dashboard/DashboardCard'
import PerformanceCard from '../components/dashboard/PerformanceCard'
import { getAllItems, getItemSalesByYear, getItemsTable, getMonthlyItemSales, getTopCategory, getTopItem, getTopItems, getWeeklyItemSales } from '../api'
import LoadingScreen from '../components/LoadingScreen'
import Filter from '../components/dashboard/Filter'
import { showAlert } from '../utils'
import { BarChart, LineChart } from '@mui/x-charts'
import dayjs from 'dayjs'
import YearCount from '../components/dashboard/YearCount'
import { DataGrid } from '@mui/x-data-grid'

const MenuAnalysis = () => {
  const [topItem, setTopItem] = useState(null)
  const [topCategory, setTopCategory] = useState(null)
  const [allItems, setAllItems] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [activeFilter, setActiveFilter] = useState(0)
  const [selectedItemId, setSelectedItemId] = useState(null)
  const [rows, setRows] = useState(null)
  const [topItems, setTopItems] = useState(null)
  const [tableActiveFilter, setTableActiveFilter] = useState(0)
  const [barActiveFilter, setBarActiveFilter] = useState(0)
  const [chartData, setChartData] = useState(null)
  const [year, setYear] = useState(dayjs().year())
  
  const [error, setError] = useState(false)
  const [alertOut, setAlertOut] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [chartLoading, setChartLoading] = useState(true)
  const [tableLoading, setTableLoading] = useState(true)
  const [barLoading, setBarLoading] = useState(true)

  const columns = [
    { field: 'name', headerName: 'name', width:200},
    { field: 'salesNum', headerName: 'sales number', type: "number"},
    { field: 'avg', headerName: 'avg sales/day', type: "number"},
    { field: 'price', headerName: 'price (dh)', type: 'number'},
    { field: 'totalIncome', headerName: 'total income (dh)', type: 'number', width:200}
  ]

 
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
            setSelectedItem(items[0])
            setSelectedItemId(items[0].id)
        } 
    }
    getData()
  }, [])



  useEffect(() => {
    const getData = async () => {
      setChartLoading(true)
      const data = activeFilter===0 ? await getWeeklyItemSales(selectedItemId) 
      : activeFilter === 2 ? await getItemSalesByYear(selectedItemId, year)
      : await   getMonthlyItemSales(selectedItemId)

      setChartLoading(false)
      if (data instanceof Error) {
          showAlert(setError, setAlertOut)
      } else {
          setChartData(data)
      } 
    }
    if (selectedItemId !== null)
      getData()
  }, [selectedItem, activeFilter, year])


  useEffect(() => {
    const getData = async () => {
      setTableLoading(true)
      const data = await getItemsTable(tableActiveFilter === 0 ? 7 : tableActiveFilter === 1 ? 30 : tableActiveFilter === 2 ? 365 : null)
      setTableLoading(false)
      if (data instanceof Error) {
          showAlert(setError, setAlertOut)
      } else {
          setRows(data)
      } 
    }
    getData()
  }, [tableActiveFilter])


  useEffect(() => {
    const getData = async () => {
      setBarLoading(true)
      const data = await getTopItems(barActiveFilter === 0 ? 1 : barActiveFilter === 1 ? 7 : barActiveFilter === 2 ? 30 : 365)
      setBarLoading(false)
      if (data instanceof Error) {
          showAlert(setError, setAlertOut)
      } else {
          setTopItems(data)
      } 
    }
    getData()
  }, [barActiveFilter])


  const valueFormatter = (value) => `${value} sales`;
  const salesValueFormater = (value) => `${value} sales`;
  return !isLoading ? (
    <div className='grid gap-4'>
      
      <div className='grid grid-cols-1-2 gap-2'>
        <div className='grid gap-2'>
          <PerformanceCard {...topItem} title="top seller" period="last 30 days" progress="13%" />
          <PerformanceCard {...topCategory} title="top seller category" period="last 30 days" progress="13%" />
        </div>
        <DashboardCard title="menu items progress" relative={true}>
          <div className='flex flex-col justify-start items-start mt-2'>
            <div className='flex gap-2'>
              <select 
                className='select' 
                value={selectedItemId} 
                onChange={(e) => {
                  setSelectedItemId(e.target.value)
                  setSelectedItem(allItems.find(item => item.id === parseInt(e.target.value)))
                }}
              >
                {allItems.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
              <Filter 
                onClick={() => setActiveFilter(0)} 
                text="last 7 days" 
                isActive={activeFilter===0} 
              />
              <Filter 
                onClick={() => setActiveFilter(1)} 
                text="last 30 days" 
                isActive={activeFilter===1} 
              />
              <Filter 
                onClick={() => setActiveFilter(2)} 
                text="last year" 
                isActive={activeFilter===2} 
              />
            </div>
          </div>
          {
            !chartLoading ?
            <LineChart
              xAxis={[{ data: chartData.keys, scaleType: 'point'}]}
              series={[
                {
                  data: chartData.values,
                  valueFormatter:salesValueFormater,
                },
              ]}
              height={300}
              colors={['black']}
            />
            :
            <LoadingScreen absolute={true} />
          }
          {
            activeFilter === 2 &&
            <div className='flex justify-center'>
              <YearCount 
                add={() => setYear(prev => prev+1)} 
                subtract={() => {setYear(prev => prev-1)}} 
                count={year} 
                changeCount={(value) => setYear(value)}
              />
            </div>
          }
          
        </DashboardCard>
      </div>

      <div className='grid grid-cols-2-1 gap-2'>
          <DashboardCard title="items metrics"  relative={true}>
            <div className='grid gap-2'>
              <div className='flex gap-2 mt-2'>
                <Filter 
                  onClick={() => setTableActiveFilter(0)} 
                  text="last 7 days" 
                  isActive={tableActiveFilter===0} 
                />
                <Filter 
                  onClick={() => setTableActiveFilter(1)} 
                  text="last 30 days" 
                  isActive={tableActiveFilter===1} 
                />
                <Filter 
                  onClick={() => setTableActiveFilter(2)} 
                  text="last year" 
                  isActive={tableActiveFilter===2} 
                />
                <Filter 
                  onClick={() => setTableActiveFilter(3)} 
                  text="all time" 
                  isActive={tableActiveFilter===3} 
                />
              </div>
              {
                tableLoading ?
                <LoadingScreen absolute={true} />
                :
                <div className='h-[500px] max-w-[52vw]'>
                  <DataGrid 
                    rows={rows}
                    columns={columns}
                    density='compact'
                  />
                </div>
                
              }
            </div>
          
          </DashboardCard>
          
          <DashboardCard title="top performing items" relative={true}>
            <div className='grid gap-2'>
              <div className='flex gap-2 mt-2'>
                <Filter 
                  onClick={() => setBarActiveFilter(0)} 
                  text="today" 
                  isActive={barActiveFilter===0} 
                />
                <Filter 
                  onClick={() => setBarActiveFilter(1)} 
                  text="last 7 days" 
                  isActive={barActiveFilter===1} 
                />
                <Filter 
                  onClick={() => setBarActiveFilter(2)} 
                  text="last 30 days" 
                  isActive={barActiveFilter===2} 
                />
                <Filter 
                  onClick={() => setBarActiveFilter(3)} 
                  text="last year" 
                  isActive={barActiveFilter===3} 
                />
                
              </div>
              {
                barLoading ?
                <LoadingScreen absolute={true} />
                :
                <div className='h-[500px]'>
                  <BarChart 
                    dataset={topItems}
                    yAxis={[{ scaleType: 'band', dataKey: 'name' }]}
                    series={[{ dataKey: 'count', label: 'number of sales', valueFormatter }]}
                    borderRadius={5}
                    colors={[""]}
                    layout='horizontal'
                  />
                </div> 
              }
            </div>
          </DashboardCard>
      </div>
    </div>
  ) : <LoadingScreen />
}

export default MenuAnalysis
