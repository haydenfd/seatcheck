import React from 'react'

import { Link } from 'react-router-dom'

import { StyledButton } from '../ui/styled-button'
export const NotFound = () => {
  return (
    <div className="App min-h-screen overflow-auto">
        <div className="mt-4 pt-2 mx-auto w-full text-center">
            <h1 className="text-4xl font-bold">Seatcheck @ UCLA</h1>
            <h2 className="text-2xl mt-2 underline font-medium">
                Get notified when a class space opens up
            </h2>
        </div>
        <div className='w-full text-center mt-20'>
            <h1 className='text-4xl font-bold uppercase'>404! Page not found!</h1>
            <Link to="/">
                <StyledButton text="Take me back home" classes="mt-10"/> 
            </Link>
        </div>
  </div>
  )
}
