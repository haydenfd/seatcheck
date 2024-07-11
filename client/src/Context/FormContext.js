import { createContext, useContext, useState } from "react";

export const FormContext = createContext({})



export const FormProvider = ({ children }) => {


    const [step, setStep] = useState(1);
    
    const titles = [
        'Choose professor',
        'Pick course offering',
        'Personal information',
    ];

    const [formData, setFormData] = useState({
        name: "h",
        major: "",
        term: "g",
        professor: "",
        email: "j",
        course_url: "h",
        href: "t",
        professors: [],
    });

    const gotoPrevStep = () => setStep(curr => curr - 1);
    const gotoNextStep = () => setStep(curr => curr + 1);

    const canPrev1 = step === 2 && formData.major && formData.major.length > 0 ;
    const canPrev2 = step === 3 && formData.href.length > 0;
    const canNext2 = step === 1 && formData.major && formData.major.length > 0 && formData.professor && formData.professor.length > 0;
    const canNext3 = step === 2;

    const isFormGoodToSubmit = () => {
        const validationResults = {};
  
        for (const [key, value] of Object.entries(formData)) {
          if (Array.isArray(value)) {
            validationResults[key] = value.length > 0;
          } else if (typeof value === 'string') {
            validationResults[key] = value.trim() !== '';
          } else {
            validationResults[key] = !!value;
          }
        }
      
        const total = Object.keys(validationResults).length;
        const valid = Object.values(validationResults).filter(Boolean).length;

        return total === valid;
    }

    return (
        <FormContext.Provider value={{ formData, setFormData, step, setStep, gotoNextStep, gotoPrevStep, canPrev1, canPrev2, canNext2, canNext3, titles, isFormGoodToSubmit }}>
            {children}
        </FormContext.Provider>
    )
}

export const useFormContext = () => {
    return useContext(FormContext);
}