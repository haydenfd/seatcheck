import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { StyledButton } from "@/components/ui/styled-button";
import { StyledInput } from "@/components/ui/styled-input";
import { mutatePersonalDetails } from "@/store/form-slice";
import { useStepContext } from "@/context/stepcontext";

export const Step3 = () => {
  const dispatch = useDispatch();

  const { prevStep } = useStepContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(true);

  const isValidEmail = (_email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(_email);
  };

  function isEmptyOrSpaces(str) {
    return str === "" || str.match(/^ *$/) !== null;
  }

  const canUserSubmit = useMemo(() => {
    return !isEmptyOrSpaces(name) && !isEmptyOrSpaces(email);
  }, [name, email]);

  const handleSubmit = () => {
    const emailValid = isValidEmail(email);

    if (!emailValid) {
      setIsEmailValid(false);
      setEmail("");
    } else {
      setIsEmailValid(true);
      console.log("Submitted");
      const personalDetailsPayload = {
        name: name,
        email: email,
      };

      dispatch(mutatePersonalDetails(personalDetailsPayload));
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="w-3/4 mx-auto">
        <StyledInput
          label="Enter your name"
          placeholder="Joe Bruin"
          inputState={name}
          setInputState={setName}
        />
        <StyledInput
          label="Enter your email address"
          placeholder="skobru@ucla.edu"
          errorMessage="Please enter a valid email!"
          inputState={email}
          setInputState={setEmail}
          isInvalid={!isEmailValid}
        />
      </div>
      <div>
        <StyledButton
          onPress={prevStep}
          isButtonDisabled={false}
          text="Previous"
          classes="w-1/2 flex-1"
        />
        <StyledButton
          onPress={handleSubmit}
          isButtonDisabled={!canUserSubmit}
          text="Submit"
          classes="w-1/2 flex-1"
        />
      </div>
    </div>
  );
};
