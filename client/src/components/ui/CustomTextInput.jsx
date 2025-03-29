import React from 'react'

import { Input, cn } from '@heroui/react'

export const CustomTextInput = ({
    labelText="",
    placeholderText,
    inputValue="", // binds to the state variable
    setInputValue,
    customClasses="",
}) => {
  return (
    <Input
    classNames={{
        label: cn("font-semibold text-sm text-black-600 font-open"),
        input: cn("placeholder:text-slate-500 font-medium"),
        inputWrapper: cn("border-2 border-[#005587] focus-within:border-[#ffd100] rounded-md p-2 bg-white font-sans"),
        mainWrapper: cn("py-2"),
        // errorMessage: cn(
        //   `font-medium text-sm invisible ${isInvalid ? "visible" : ""}`,
        // ),
    }}
    isRequired={true}
    value={inputValue}
    onValueChange={setInputValue}
    isClearable={true}
    placeholder={placeholderText}
    labelPlacement='outside'
    label={labelText}
    />
  )
}
