import React, { useState } from "react";
import { StyledInput, StyledButton } from "../../UIComponents";
import { useDispatch } from "react-redux";
import { mutatePersonalDetails } from "../../../Store/formSlice";

export const Step1 = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log("Submitted");
    const personalDetailsPayload = {
      name: name,
      email: email,
    };

    dispatch(mutatePersonalDetails(personalDetailsPayload));
  };
  return (
    <div className="flex flex-col gap-8 w-full">
      <StyledInput
        label="Enter your name"
        placeholder="Joe Bruin"
        inputState={name}
        setInputState={setName}
      />
      <StyledInput
        label="Enter your email address"
        placeholder="skobru@ucla.edu"
        errorMessage="Please enter a valid email"
        inputState={email}
        setInputState={setEmail}
      />
      <div className="w-full bg-blue-500 flex">
        <StyledButton
          onPress={() => console.log("hello")}
          text="Prev"
          classes="flex-1"
        />
        <StyledButton onPress={handleSubmit} text="Submit" classes="flex-1" />
      </div>
    </div>
  );
};
