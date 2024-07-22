import { Input, cn } from "@nextui-org/react";
import React from "react";

export const StyledInput = ({
  label,
  placeholder,
  inputState,
  setInputState,
  isInvalid = false,
  errorMessage = "",
  isInputRequired = true,
  ...props
}) => {
  return (
    <Input
      {...props}
      classNames={{
        label: cn("font-semibold text-sm"),
        input: ["placeholder:text-default-700/90"],
      }}
      isRequired={isInputRequired}
      label={label}
      placeholder={placeholder}
      labelPlacement="outside"
      value={inputState}
      onValueChange={setInputState}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      color={isInvalid ? "danger" : ""}
    />
  );
};
