import React from "react";

import { Input, cn } from "@heroui/react";

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
        label: cn("font-medium text-sm text-black-600 font-open italic"),
        input: cn("placeholder:text-slate-500 font-medium"),
        inputWrapper: cn("border-2 border-black rounded-md p-2 bg-white font-sans"),
        mainWrapper: cn("py-2"),
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
