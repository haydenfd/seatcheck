import { Input } from "@nextui-org/react";
import React from "react";

const StyledInput = ({ label, placeholder, inputState, setInputState }) => {
  return (
    <Input
      label={label}
      placeholder={placeholder}
      classNames={{
        label: "text-medium font-semibold",
        input: ["text-medium", "placeholder:text-default-700/90"],
      }}
      labelPlacement="outside"
      value={inputState}
      onValueChange={setInputState}
    />
  );
};

export default StyledInput;
