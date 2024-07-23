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
