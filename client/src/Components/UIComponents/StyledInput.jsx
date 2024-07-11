import { Input, cn} from "@nextui-org/react";
import React from "react";

export const StyledInput = ({ label, placeholder, inputState, setInputState, isInputRequired = true, ...props}) => {
  return (
    <Input
      isRequired={isInputRequired}
      label={label}
      placeholder={placeholder}
      {...props}
      classNames={{
        label: cn("text-white/50 "),
        input: ["placeholder:text-default-700/90"],
      }}
      labelPlacement="outside"
      value={inputState}
      onValueChange={setInputState}
    />
  );
};

