import { createContext, useContext, useState } from "react";

export const StepContext = createContext({});

export const StepProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState("next");
  const [isFirstRender, setIsFirstRender] = useState(true); // Track if this is the first time the form is rendered

  const nextStep = () => {
    setDirection("next");
    setStep((prev) => Math.min(prev + 1, 3));
    setIsFirstRender(false); // Disable the first render flag after the first action
  };

  const prevStep = () => {
    setDirection("prev");
    setStep((prev) => Math.max(prev - 1, 1));
    setIsFirstRender(false); // Disable the first render flag after the first action
  };

  const resetStep = () => {
    setDirection("next");
    setStep(1);
    setIsFirstRender(true); // Reset the first render flag when the form is reset
  };

  return (
    <StepContext.Provider
      value={{
        step,
        nextStep,
        prevStep,
        resetStep,
        direction,
        isFirstRender, // Pass the first render flag to track initial load
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

export const useStepContext = () => {
  return useContext(StepContext);
};
