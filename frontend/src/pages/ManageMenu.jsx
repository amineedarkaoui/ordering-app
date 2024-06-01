import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import { getAllCategories } from '../api'
import ManageCategory from '../components/ManageCategory'
import CategoryForm from '../components/forms/CategoryForm'
import Alert from '../components/Alert'
import { showAlert } from '../utils'

const ManageMenu = () => {
    const [categories, setCategories] = useState(null)
    const [category, setCategory] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [showCategoryForm, setShowCategoryForm] = useState(false)
    const [categorySuccess, setCategorySuccess] = useState(false)
    const [categoryUpdateSuccess, setCategoryUpdateSuccess] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)
    const [alertOut, setAlertOut] = useState(false)
    const [update, setUpdate] = useState(0)
    const [categoryDeleteAlert, setCategoryDeleteAlert] = useState(false)



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
    }, [update])
  return (
    <div className='flex flex-col gap-2'>
        <div className='flex'>
            <Button onClick={() => setShowCategoryForm(true)} text="new category" startIcon="ic:baseline-plus" />
        </div>
      
      {
        !isLoading ?
        categories.map(category => <ManageCategory 
          category={category}
          deleteAlert={() => showAlert(setCategoryDeleteAlert, setAlertOut)} 
          update={() => setUpdate(prev => prev+1)} 
          key={category.id}
          editCategory={category => {setCategory(category); setShowCategoryForm(true)}} 
        />)
        :
        <div className='flex flex-col gap-2'>
            <ManageCategory isLoading={true} />
            <ManageCategory isLoading={true} />
            <ManageCategory isLoading={true} />
            <ManageCategory isLoading={true} />
        </div>
      }

      {
        showCategoryForm && 
        <CategoryForm 
          cancel={() => setShowCategoryForm(false)} 
          success={setCategorySuccess}
          editSuccess={setCategoryUpdateSuccess}
          error={setErrorAlert}
          setAlertOut={setAlertOut}
          update={() => setUpdate(prev => prev+1)}
          category={category}
          resetCategory={() => setCategory(null)}
        />
      }

      {
          errorAlert &&
          <Alert alertOut={alertOut} error={true} text={`an error has occured, try again`} />
      }
      {
          categorySuccess &&
          <Alert alertOut={alertOut} text={`New category added`} />
      }
      {
          categoryUpdateSuccess &&
          <Alert alertOut={alertOut} text={`Category updated successfully`} />
      }
      {
          categoryDeleteAlert &&
          <Alert alertOut={alertOut} text={`Category deleted successfully`} />
      }
      
    </div>
  )
}

export default ManageMenu
