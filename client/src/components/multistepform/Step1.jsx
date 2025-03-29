import React from 'react'

import { CustomTextInput } from '../ui/CustomTextInput'

export const Step1 = ({formData, setFormData}) => {
  return (
    <div className='text-black w-full'>
        <CustomTextInput 
            inputValue={formData.name}         
            setInputValue={(val) => setFormData((f) => ({ ...f, name: val }))}
            placeholderText='Joseph Bruin'
            labelText="What's your name?"
        />
        <CustomTextInput 
            inputValue={formData.email}         
            setInputValue={(val) => setFormData((f) => ({ ...f, email: val }))}
            placeholderText='jbruin@ucla.edu'
            labelText="What's your email address?"
        />
        <CustomTextInput 
            inputValue={formData.confirmationEmail}         
            setInputValue={(val) => setFormData((f) => ({ ...f, confirmationEmail: val}))}
            placeholderText='jbruin@ucla.edu'
            labelText="Confirm your email address"

        />                
    </div>
  )
}

