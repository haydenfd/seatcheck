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
  isClearable = false,
  ...props
}) => {
  return (
    <Input
      {...props}
      classNames={{
        label: cn("font-semibold text-sm"),
        input: ["placeholder:text-default-700/90"],
        errorMessage: cn(
          `font-medium text-sm invisible ${isInvalid ? "visible" : ""}`,
        ),
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
      isClearable = {isClearable}
    />
  );
};
