import React, { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard'
import { getCategoryItems } from '../api'
import { useParams } from 'react-router-dom'

const ItemPage = () => {
  const [items, setItems] = useState(null)
  const [isLoading, setLoading] = useState(true)

  const {id} = useParams()

  useEffect(() => {
    const getData = async () => {
      const response = await getCategoryItems(id)
      if (response instanceof Error) {
        console.log(response)
        setError("error")
      } else {
        setItems(response)
        setLoading(false)
      } 
    }
    getData()
  }, [])

  return (
    <div>
      { isLoading ?
        <div className='grid gap-4 item-grid mx-auto w-full mt-6'>
          <ItemCard isLoading={isLoading} />
          <ItemCard isLoading={isLoading} />
          <ItemCard isLoading={isLoading} />
          <ItemCard isLoading={isLoading} />
          <ItemCard isLoading={isLoading} />
          <ItemCard isLoading={isLoading} />
          <ItemCard isLoading={isLoading} />
          <ItemCard isLoading={isLoading} />
          <ItemCard isLoading={isLoading} />
          <ItemCard isLoading={isLoading} />
          <ItemCard isLoading={isLoading} />
          <ItemCard isLoading={isLoading} />  
        </div>
        :
        <div className='grid gap-4 item-grid mx-auto w-full mt-6'>
          
          {
            items.length === 0 ?
            <p className='m-auto mt-10'>no items yet</p>
            :
            items.map(item => (
              <ItemCard
                  item={item}
                  key={item.id}
              />
            ))
          }
        </div>
      }
    </div>
    
  )
}

export default ItemPage
