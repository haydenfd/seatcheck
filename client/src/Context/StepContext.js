import { createContext, useContext, useState } from "react";

export const StepContext = createContext({});

export const StepProvider = ({ children }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const resetStep = () => setStep(1);

  return (
    <StepContext.Provider
      value={{
        step,
        nextStep,
        prevStep,
        resetStep,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

export const useStepContext = () => {
  return useContext(StepContext);
};

// import { createContext, useContext, useState } from "react";

// export const StepContext = createContext({});

// const INITIAL_STEP_DATA = {
//   step: 0,
// };

// export const FormProvider = ({ children }) => {
//   const [step, setStep] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadingText, setLoadingText] = useState(false);

//   const titles = [
//     "Choose professor",
//     "Pick course offering",
//     "Personal information",
//   ];

//   const [formData, setFormData] = useState(BOILERPLATE_FORM_DATA);

//   const gotoPrevStep = () => setStep((curr) => curr - 1);
//   const gotoNextStep = () => setStep((curr) => curr + 1);
//   const gotoFirstStep = () => setStep(1);

//   const canPrev1 = step === 2 && formData.major && formData.major.length > 0;
//   const canPrev2 = step === 3 && formData.href.length > 0;
//   const canNext2 =
//     step === 1 &&
//     formData.major &&
//     formData.major.length > 0 &&
//     formData.professor &&
//     formData.professor.length > 0;
//   const canNext3 = step === 2;

//   const handleGenericFieldChange = (field, newValue) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [field]: newValue,
//     }));
//   };

//   function isValidEmailFormat() {
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailRegex.test(formData.email);
//   }

//   const isFormGoodToSubmit = () => {
//     const validationResults = {};

//     for (const [key, value] of Object.entries(formData)) {
//       if (Array.isArray(value)) {
//         validationResults[key] = value.length > 0;
//       } else if (typeof value === "string") {
//         validationResults[key] = value.trim() !== "";
//       } else {
//         validationResults[key] = !!value;
//       }
//     }

//     const total = Object.keys(validationResults).length;
//     const valid = Object.values(validationResults).filter(Boolean).length;

//     return total === valid;
//   };

//   const handleCoursesChange = (courses_info) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       courses: courses_info,
//     }));
//   };

//   const hardResetAllFormData = () => {
//     gotoFirstStep();
//     setFormData(BOILERPLATE_FORM_DATA);
//   };

//   return (
//     <FormContext.Provider
//       value={{
//         isValidEmailFormat,
//         handleGenericFieldChange,
//         formData,
//         setFormData,
//         step,
//         setStep,
//         gotoNextStep,
//         gotoPrevStep,
//         canPrev1,
//         canPrev2,
//         canNext2,
//         canNext3,
//         titles,
//         isFormGoodToSubmit,
//         handleCoursesChange,
//         hardResetAllFormData,
//         isLoading,
//         setIsLoading,
//         loadingText,
//         setLoadingText,
//       }}
//     >
//       {children}
//     </FormContext.Provider>
//   );
// };

// export const useFormContext = () => {
//   return useContext(FormContext);
// };
