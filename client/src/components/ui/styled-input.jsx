import React from "react";

import { Input, cn } from "@nextui-org/react";

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
        label: cn("font-medium text-md text-black-600 font-sans"),
        input: cn("placeholder:text-default-700/90 font-medium"),
        inputWrapper: cn("border-3 border-black rounded-md p-2"),
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
