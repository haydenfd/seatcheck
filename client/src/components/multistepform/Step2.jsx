import React from 'react'

export const Step2 = ({formData, setFormData}) => {
  return (
<div className='text-black w-full'>
        <input 
            type="text" 
            value={formData.name}         
            onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
            placeholder='Enter your name'
        />
        <input 
            type="text" 
            value={formData.email}         
            onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
            placeholder='Enter your email address'
        />
        <input 
            type="text" 
            value={formData.confirmationEmail}         
            onChange={(e) => setFormData((f) => ({ ...f, confirmationEmail: e.target.value }))}
            placeholder='Confirm your email address'
        />                
    </div>
  )
}

