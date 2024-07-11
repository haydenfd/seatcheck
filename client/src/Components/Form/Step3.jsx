import React from 'react'
import { useFormContext } from '../../Context/FormContext'
import { StyledInput } from '../StyledInput';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider} from "@nextui-org/react";

export const Step3 = () => {
    const {
        formData, 
        setFormData,
        isFormGoodToSubmit
    } = useFormContext();



    const handleNameChange = (newName) => {
        setFormData(prevData => ({
          ...prevData,
          name: newName
        }));
      };    
      
    const handleEmailChange = (newEmail) => {
        setFormData(prevData => ({
          ...prevData,
          email: newEmail
        }));
      };          

  return (
    <div className='flex flex-col w-4/5 gap-4'>
        <StyledInput label="What's your name?" placeholder="Joe Bruin" inputState={formData.name} setInputState={handleNameChange}/>
        <StyledInput label="What's your email address?" placeholder="skobru@ucla.edu" inputState={formData.email} setInputState={handleEmailChange}/>    
        <button onClick={() => console.log(isFormGoodToSubmit())}>Hi</button>
    </div>
  )
}
