import React, { useEffect, useRef, useState } from 'react'
import { addNewItem, getAllCategories, updateItem, updateItemImage } from '../../api'
import CategoryImage from './CategoryImage'
import PopUp from '../PopUp'
import FieldError from '../FieldError'
import Input from './Input'
import Button from '../Button'
import { Autocomplete, Box, TextField } from '@mui/material'
import { showAlert } from '../../utils'
import LoadingScreen from '../LoadingScreen'

const ItemForm = (props) => {
  const [categories, setCategories] = useState(null)
  const [name, setName] = useState(props.item?.name || "")
  const [price, setPrice] = useState(props.item?.price || "")
  const [category, setCategory] = useState(props.category || null)
  const [categoryValue, setCategoryValue] = useState(props.category?.name || "")
  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [cropData, setCropData] = useState(null);
  const [cropPreview, setCropPreview] = useState(props.item?.image || null)
  const [fieldError, setFieldError] = useState({
      name:null,
      image:null,
      price:null,
      category:null,
  })
  const [isLoading, setLoading] = useState(true)
  
    const hiddenFileInput = useRef(null)
  
    const handleUploadClick = () => {
      hiddenFileInput.current.click()
    }
  
    const handleProfileChange = (event) => {
      event.preventDefault();
  
      if (event.target.files) {
          const reader = new FileReader();
          reader.onload = () => {
              setImage(reader.result);
          };
          reader.readAsDataURL(event.target.files[0]);
          setFileName(event.target.files[0].name)
      }
    }
  
    const addItem = async () => {
      setFieldError({name:null, image:null, price:null, category:null})
  
      if (name === "") {
        setFieldError(prev => ({...prev, name:"please fill up this field"}))
        return
      }
      if (price === "") {
        setFieldError(prev => ({...prev, price:"please fill up this field"}))
        return
      }
      if (cropPreview === null) {
        setFieldError(prev => ({...prev, image:"please upload photo"}))
        return
      }
      if (category === null || category.name !== categoryValue) {
        setFieldError(prev => ({
            ...prev,
            category:"Please select a category"
        }))
        return
    }
  
      setLoading(true)
      if (props.item === null) {
        const res = await addNewItem(name, price, category)
        if (!(res instanceof Error)) {
          const response = await updateItemImage(res, cropData)
          setLoading(false)
          if (!(response instanceof Error)) {
              showAlert(props.success, props.setAlertOut)
              props.update()
              props.cancel()
          } else {showAlert(props.error, props.setAlertOut)}
        } else {
            showAlert(props.error, props.setAlertOut)
            setLoading(false)
          }
      }
      else {
        const res = await updateItem(props.item.id, name, price, category)
        if (!(res instanceof Error)) {
          if (cropData !== null) {
            const response = await updateItemImage(props.item.id, cropData)
            setLoading(false)
            if (!(response instanceof Error)) {
                showAlert(props.updateSuccess, props.setAlertOut)
                props.update()
                props.resetItem()
                props.cancel()
            } else {showAlert(props.error, props.setAlertOut)}
          } else {
            showAlert(props.error, props.setAlertOut)
          }
          
        } else {
          showAlert(props.error, props.setAlertOut)
          setLoading(false)
        }
      }
      
    }



    useEffect(() => {
      const getData = async () => {
          const response = await getAllCategories()
          if (response instanceof Error) {
            showAlert(props.error, props.setAlertOut)
          } else {
            setCategories(response)
            setLoading(false)
          } 
      }
  
      getData()
    }, [])
    
    return (
      <div>
        <PopUp 
            ok={addItem}
            cancel={() => {props.resetItem(); props.cancel()}} 
            okText={"save"} 
            cancelText={"cancel"}
        >
            <div className='flex flex-col gap-2 items-center'>
                <p className='text-2xl font-medium'>new item</p>
                <Input
                    label="item name*"
                    placeholder="ex: tagine"
                    id="name"
                    value={name}
                    error={name==="" && fieldError.name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label="price*"
                    placeholder="price in dh"
                    id="price"
                    value={price}
                    error={price==="" && fieldError.price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                />
                {/* { !isLoading && categories != null && */}
                <div className='w-full'>
                  <label className='pl-2 font-medium' for="category">category</label>
                  <Autocomplete
                    id='category'
                    freeSolo
                    fullWidth
                    value={category}
                    onChange={(event, newValue) => {setCategory(newValue)}}
                    inputValue={categoryValue}
                    onInputChange={(event, newInputValue) => {setCategoryValue(newInputValue)}}
                    options={categories}
                    getOptionLabel={option => option.name}
                    getOptionKey={option => option.id}
                    renderInput={(params) => <TextField
                      sx={{border:"2px solide red "}}
                      variant="outlined" 
                      {...params} 
                      placeholder='select category'
                   />}
                  renderOption={(props, option) => (
                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                          loading="lazy"
                          width="30"
                          height={30}
                          src={option.image}
                          alt=""
                        />
                        {option.name}
                      </Box>
                    )}
                  autoHighlight
                />
                {
                  fieldError.category !== null &&
                  <FieldError text={fieldError.category} />
                }
                </div>
                {/* } */}
                <div>
                  <div className='flex items-center gap-2'>
                  <Button 
                    className='mx-auto'  
                    text="upload photo*" 
                    fill={true} 
                    endIcon="material-symbols:upload" 
                    onClick={handleUploadClick}
                  />
                  {
                    cropPreview !== null &&
                    <img src={cropPreview} className='w-14 shadow aspect-square' />
                  }
                </div>
                {
                  fieldError.image !== null && cropPreview === null &&
                  <FieldError text={fieldError.image} />
                }
                </div>
                
                
                <input
                    type="file"
                    ref={hiddenFileInput}
                    className='hidden'
                    onChange={handleProfileChange}
                />
                
            </div>
        </PopUp>
  
        {
          image !== null && 
          <CategoryImage 
            image={image} 
            setCropData={setCropData}
            setCropPreview={setCropPreview}
            setImage={setImage}
            fileName={fileName}
          />
        }
        
        {
          isLoading &&
          <LoadingScreen />
        }
      </div>
    )
}

export default ItemForm
