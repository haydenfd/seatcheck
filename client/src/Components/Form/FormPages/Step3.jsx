import React from 'react'
import { useFormContext } from '../../../Context/FormContext'
import { StyledInput } from '../../UIComponents';

export const Step3 = () => {
    const {
        formData, 
        handleGenericFieldChange,
        isValidEmailFormat, //todo: integrate
    } = useFormContext();

    const handleNameChange = (newName) => handleGenericFieldChange("name", newName);    
    const handleEmailChange = (newEmail) => handleGenericFieldChange("email", newEmail);

  return (
    <div className='flex flex-col w-4/5 gap-8'>
        <StyledInput label="What's your name?" placeholder="Joe Bruin" inputState={formData.name} setInputState={handleNameChange}/>
        <StyledInput label="What's your email address?" placeholder="skobru@ucla.edu" inputState={formData.email} setInputState={handleEmailChange}/>    
    </div>
  )
}
