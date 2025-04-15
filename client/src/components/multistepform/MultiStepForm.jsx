import React, { useState } from 'react'

import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { Step3 } from './Step3'
import { ConfirmationModal } from '../ui/ConfirmationModal'
import { CustomButton } from '../ui/CustomButton'

const TITLES = ["Contact Information", "Course Information", "Finalize Tracking"]

export const MultiStepForm = ({ onClose }) => {
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirmationEmail: "",
    term: null,
    department: null,
    course: null,
    offering: null,
    courses: [],
    lectures: [],
    crs_catlg_no: "",
  })

  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleFormSubmit = () => {
    console.log("Submitted form:", formData)

    // Show modal *without unmounting this component yet*
    setShowConfirmation(true)

    // Delay closing the form slightly to let the modal render first
    setTimeout(() => {
      onClose()
    }, 100)
  }

  const next = () => {
    if (currentStep === 1) {
      const newErrors = {}
      if (!formData.name.trim()) newErrors.name = "Name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      if (!formData.confirmationEmail.trim()) newErrors.confirmationEmail = "Please confirm your email"
      if (formData.email.trim() && formData.confirmationEmail.trim() && formData.email !== formData.confirmationEmail) {
        newErrors.confirmationEmail = "Emails do not match"
      }
  
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }
    }
  
    // Clear errors and proceed
    setErrors({})
    setCurrentStep((s) => s + 1)
    console.log("Next step with data:", formData)
  }
  

  const back = () => setCurrentStep((s) => s - 1)

  return (
    <>
      {/* Modal is mounted separately using Portal and remains after form closes */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      />

      {/* Form disappears only AFTER modal is visible */}
      {!showConfirmation && (
        <div className="p-6 border rounded-md shadow-md w-full max-w-[40%] bg-white mx-auto relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-4 hover:text-ucla-blue text-5xl text-gray-700"
          >
            &times;
          </button>

          <h2 className="text-xl text-gray-700 font-semibold text-center mb-4">
            {TITLES[currentStep - 1]}
          </h2>

          <form onSubmit={(e) => e.preventDefault()} className="mt-12">
            {currentStep === 1 && (
            <Step1 formData={formData} setFormData={setFormData} errors={errors} />
)}
            {currentStep === 2 && (
              <Step2 formData={formData} setFormData={setFormData} />
            )}
            {currentStep === 3 && (
              <Step3 formData={formData} setFormData={setFormData} />
            )}

            <div className="mt-4 flex justify-between">
              <CustomButton onButtonPress={back} displayText="Back" isButtonDisabled={currentStep === 1} />
              {currentStep < 3 ? (
                <CustomButton onButtonPress={next} displayText="Next" />
              ) : (
                <CustomButton onButtonPress={handleFormSubmit} displayText="Submit" />
              )}
            </div>
          </form>
        </div>
      )}
    </>
  )
}
