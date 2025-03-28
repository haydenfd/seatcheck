import React, {useState} from 'react'

import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { CustomButton } from '../ui/CustomButton';

export const MultiStepForm = ({onClose}) => {

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        confirmationEmail: "",
      });

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted form")
    }

    const next = () => {
        setCurrentStep((s) => s + 1);
        console.log(formData)
    }
    const back = () => setCurrentStep((s) => s - 1);
    
  return (
    <div className="p-6 border rounded-md shadow-md w-full max-w-[40%] bg-white mx-auto relative">
    <button
      onClick={onClose}
      className="absolute top-2 right-4 hover:text-ucla-blue text-5xl text-red-500 "
    >
      &times;
    </button>

    <h2 className="text-xl font-semibold text-center mb-4">{}</h2>

    <form onSubmit={handleFormSubmit}>
      {currentStep === 1 && (
        <Step1 formData={formData} setFormData={setFormData} />
      )}
       {currentStep === 2 && (
        <Step2 formData={formData} setFormData={setFormData} />
      )}
      {/* {step === 3 && (
        <Step3 formData={formData} setFormData={setFormData} errors={errors} />
      )} */}

      <div className="mt-4 flex justify-between">
        <CustomButton onButtonPress={back} displayText="Back" isButtonDisabled={currentStep == 1}/>
        {currentStep < 3 ? (
            <CustomButton onButtonPress={next} displayText="Next"/>
        ) : (
            <CustomButton onButtonPress={next} displayText="Submit"/>
        )}
      </div>
    </form>
  </div>
  )
}
