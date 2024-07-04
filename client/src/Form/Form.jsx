import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import StyledInput from "../Components/StyledInput";

export const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [courseUrl, setCourseUrl] = useState("");

  const handleSubmit = (e) => {
    alert(`Form submitted: ${name}`);
  };

  return (
    <form
      className="w-full bg-white p-4 flex flex-col mx-auto gap-8"
      onSubmit={handleSubmit}
    >
      <StyledInput
        label="What do we call you?"
        placeholder="Enter your name"
        inputState={name}
        setInputState={setName}
      />
      <StyledInput
        label="Where do we notify you?"
        placeholder="Enter your email address"
        inputState={email}
        setInputState={setEmail}
      />
      <StyledInput
        label="Which class do you want to track?"
        placeholder="Enter course URL"
        inputState={courseUrl}
        setInputState={setCourseUrl}
      />
      <Button
        className="bg-[#FFB81C] text-[#003b5c] p-4 text-medium w-1/2 mx-auto"
        onPress={handleSubmit}
      >
        Start tracking!
      </Button>
    </form>
  );
};
