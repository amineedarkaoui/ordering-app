import React from 'react'

const LoadingScreen = (props) => {
  return (
    <div className={`fixed bg-white/40 backdrop-blur-sm top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center gap-4 ${props.absolute && "absolute top-0 right-0 bottom-0 left-0"}`}>
        <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div class='h-8 w-8 bg-black rounded-full animate-bounce'></div>
    </div>
  )
}

export default LoadingScreen
