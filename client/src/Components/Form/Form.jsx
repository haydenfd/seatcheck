import React from 'react'
import { useFormContext } from '../../Context/FormContext'
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import {Card, CardHeader, CardBody, CardFooter, Divider, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { StyledButton } from '../StyledButton/StyledButton';
import axios from 'axios';

export const Form = () => {
    const {
        formData,
        step,
        gotoPrevStep,
        gotoNextStep,
        canPrev1, 
        canPrev2, 
        canNext2, 
        canNext3,
        titles,
        isFormGoodToSubmit
    } = useFormContext();
    
    const {isOpen, onOpen, onOpenChange} = useDisclosure();


  return (
    <Card className='w-1/2 text-black bg-white rounded-md mx-auto flex flex-col shadow-lg'>
        <CardHeader className='flex justify-center items-center text-center font-bold'>
            Step {step}/3 : {titles[step - 1]}
        </CardHeader>
        <Divider/>
        <CardBody className='my-8 flex flex-col justify-center items-center'>
           { step === 1 && <Step1 />}
           { step === 2 && <Step2 major={formData.major} />}
           { step === 3 && <Step3 />}
        </CardBody>
        <CardFooter className='flex flex-row justify-between w-2/5 mx-auto'>
            <StyledButton onPress={() => gotoPrevStep()} isButtonDisabled={!(canPrev1 || canPrev2)} text="Prev"/>
            <StyledButton onPress={step === 3? () => onOpen() : () => gotoNextStep()} isButtonDisabled={!(canNext2 || canNext3 || isFormGoodToSubmit())} text={`${step === 3 ? "Finish" : "Submit"}`}/>
        </CardFooter>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent> 
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirmation</ModalHeader>
              <Divider/>
              <ModalBody>
                <h3>Thanks, {formData.name}</h3>
                <p>
                  We just sent you an email at {formData.email} to confirm that tracking for course X has been set up!
                </p>
              </ModalBody>
              <ModalFooter>
              <StyledButton onPress={onClose} text="Close"/>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>        
    </Card>
  )
}
