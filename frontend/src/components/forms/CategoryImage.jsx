import React, { useRef } from 'react'
import { Cropper } from 'react-cropper';
import PopUp from '../PopUp';
import "cropperjs/dist/cropper.css";

const CategoryImage = (props) => {
    const cropperRef = useRef(null);

    const savePhoto = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            props.setCropPreview(cropperRef.current?.cropper.getCroppedCanvas().toDataURL())
          const canvas = cropperRef.current?.cropper.getCroppedCanvas()
          canvas.toBlob((blob) => {
              if (!blob) {
                  console.error('Error converting canvas to blob');
                  setError(() => true)
                  return;
              }
              const croppedImage = new File([blob], props.fileName, {type: 'image/png'})
              props.setCropData(croppedImage);
          })
      }
      props.setImage(null)
    }

  return (
    <PopUp 
        ok={savePhoto}
        cancel={() => props.setImage(null)} 
        okText={"crop image"}
        cancelText={"cancel"}
    >
        <div style={{ width: "100%", height: "400px", position: 'relative' }}>
            <Cropper 
                ref={cropperRef}
                style={{ height: "100%", width: "100%" }}
                aspectRatio={1/1}
                dragMode="move"
                src={props.image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} 
                guides={true}
            />
        </div>
    </PopUp>
  )
}

export default CategoryImage
