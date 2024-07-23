import React, { useEffect } from "react";
import { StyledInput, StyledButton } from "../../UIComponents";
import { useDispatch } from "react-redux";
import { useStepContext } from "../../../Context/StepContext";

export const Step2 = () => {
  const dispatch = useDispatch();

  const { nextStep, prevStep } = useStepContext();

  useEffect(() => {
  }, [])

  return (
    <div className="flex flex-col gap-8 w-full">
      <section className="text-center w-full">
        <h3>Some data goes here</h3>
      </section>
      <div>
         <StyledButton
            onPress={prevStep}
            isButtonDisabled={false}
            text="Previous"
            classes="w-1/2 flex-1"
          />
          <StyledButton
            onPress={nextStep}
            isButtonDisabled={false}
            text="Next"
            classes="w-1/2 flex-1"
          />        
      </div>      
    </div>
  );
};
