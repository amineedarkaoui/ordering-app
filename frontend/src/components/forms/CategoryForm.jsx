import React, { useRef, useState } from 'react'
import PopUp from '../PopUp'
import Input from './Input'
import Button from '../Button'
import CategoryImage from './CategoryImage'
import LoadingScreen from '../LoadingScreen'
import FieldError from '../FieldError'
import { addNewCategory, updateCategory } from '../../api'
import { showAlert } from '../../utils'

const CategoryForm = (props) => {
  const [name, setName] = useState(props.category?.name || "")
  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [cropData, setCropData] = useState(null);
  const [cropPreview, setCropPreview] = useState(props.category?.image || null)
  const [fieldError, setFieldError] = useState({
      name:null,
      image:null,
  })
  const [isLoading, setLoading] = useState(false)

  const hiddenFileInput = useRef(null)

  const handleUploadClick = () => {
    hiddenFileInput.current.click()
  }

  const closeWindow = () => {
    if (props.category !== null) 
      props.resetCategory()
    props.cancel()
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

  const addCategory = async () => {
    setFieldError({name:null, image:null,})

    if (name === "") {
      setFieldError(prev => ({...prev, name:"please fill up this field"}))
      return
    }
    if (cropPreview === null) {
      setFieldError(prev => ({...prev, image:"please upload photo"}))
      return
    }

    setLoading(true)
    if (props.category === null) {
      const res = await addNewCategory(name, cropData)
      setLoading(false)
      if (!(res instanceof Error)) {
          showAlert(props.success, props.setAlertOut)
          props.update()
          props.cancel()
      } else {showAlert(props.error, props.setAlertOut)}
    } else {
      const res = await updateCategory(props.category.id, name, cropData)
      setLoading(false)
      if (!(res instanceof Error)) {
          showAlert(props.editSuccess, props.setAlertOut)
          props.update()
          props.resetCategory()
          props.cancel()
      } else {showAlert(props.error, props.setAlertOut)}
    }
    
  }
  
  return (
    <div>
      <PopUp 
          ok={addCategory}
          cancel={closeWindow} 
          okText={"save"} 
          cancelText={"cancel"}
      >
          <div className='flex flex-col gap-2 items-center'>
              <p className='text-2xl font-medium'>new category</p>
              <Input
                  label="category name*"
                  placeholder="ex: beverages"
                  id="name"
                  value={name}
                  error={name==="" && fieldError.name}
                  onChange={(e) => setName(e.target.value)}
              />

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

export default CategoryForm
