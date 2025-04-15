import React, { useEffect } from 'react'

import { CustomTextInput } from '../ui/CustomTextInput'

import { fetchPosts } from '@/api/axiosClient'

export const Step1 = ({ formData, setFormData, errors }) => {
  return (
    <div className='text-black w-full'>
      <div>
        <CustomTextInput 
          inputValue={formData.name}         
          setInputValue={(val) => setFormData((f) => ({ ...f, name: val }))}
          placeholderText='Joseph Bruin'
          labelText="What's your name?"
        />
        {errors?.name && <p className="text-red-600 mt-0 font-medium text-sm">{errors.name}</p>}
      </div>

      <div className="mt-8">
        <CustomTextInput 
          inputValue={formData.email}         
          setInputValue={(val) => setFormData((f) => ({ ...f, email: val }))}
          placeholderText='jbruin@ucla.edu'
          labelText="What's your email address?"
        />
        {errors?.email && <p className="text-red-600 mt-0 font-medium text-sm">{errors.email}</p>}
      </div>

      <div className="mt-8">
        <CustomTextInput 
          inputValue={formData.confirmationEmail}         
          setInputValue={(val) => setFormData((f) => ({ ...f, confirmationEmail: val }))}
          placeholderText='jbruin@ucla.edu'
          labelText="Confirm your email address"
        />
        {errors?.confirmationEmail && (
          <p className="text-red-600 mt-0 font-medium text-sm">{errors.confirmationEmail}</p>
        )}
      </div>
    </div>
  )
}