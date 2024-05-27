import React from 'react'

const LoadingScreen = () => {
  return (
    <div className='fixed bg-white/40 backdrop-blur-sm top-0 left-0 h-screen w-screen z-50 flex items-center justify-center gap-4'>
        <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div class='h-8 w-8 bg-black rounded-full animate-bounce'></div>
    </div>
  )
}

export default LoadingScreen
