import React, { useContext, useEffect, useState } from 'react'
import CategoryCard from '../components/CategoryCard'
import { getAllCategories } from '../api'
import { OrderContext } from '../sections/MainSection'

const CategoryPage = () => {
  const [categories, setCategories] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const {setCategoryName} = useContext(OrderContext)



  useEffect(() => {
    setCategoryName("categories")
  }, [])

  useEffect(() => {
    const getData = async () => {
      const response = await getAllCategories()
      if (response instanceof Error) {
        setError("error")
      } else {
        setCategories(response)
        setLoading(false)
      } 
    }

    getData()
  }, [])
  return (
    <div className='grid category-grid gap-4 mt-6'>
      {
        isLoading ?
          <div className='grid category-grid gap-4 mt-6'>
            <CategoryCard isLoading={isLoading} />
            <CategoryCard isLoading={isLoading} />
            <CategoryCard isLoading={isLoading} />
            <CategoryCard isLoading={isLoading} />
            <CategoryCard isLoading={isLoading} />
            <CategoryCard isLoading={isLoading} />
            <CategoryCard isLoading={isLoading} />
            <CategoryCard isLoading={isLoading} />
            <CategoryCard isLoading={isLoading} />
            <CategoryCard isLoading={isLoading} />
            <CategoryCard isLoading={isLoading} />
            <CategoryCard isLoading={isLoading} />
          </div>
          :
          categories.map(item => (
            <CategoryCard
                key={item.id}
                {...item}
                isLoading={isLoading}
            />
          ))
      }

      
      
    </div>
  )
}

export default CategoryPage
