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
  classes = "",
  ...props
}) => {
  return (
    <Input
      {...props}
      classNames={{
        label: cn("font-medium text-md text-black-600"),
        input: ["placeholder:text-default-700/90"],
        mainWrapper: cn("py-4"),
        errorMessage: cn(
          `font-medium text-sm invisible ${isInvalid ? "visible" : ""}`,
        ),
      }}
      className={classes}
      isRequired={isInputRequired}
      label={label}
      placeholder={placeholder}
      labelPlacement="outside"
      value={inputState}
      onValueChange={setInputState}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      color={isInvalid ? "danger" : ""}
      isClearable={isClearable}
    />
  );
};
