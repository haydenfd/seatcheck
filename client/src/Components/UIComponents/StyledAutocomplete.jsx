import React from 'react'
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export const StyledAutocomplete = ({data, value, setValue, label, placeholder, isDisabled=false, ...props}) => {
  return (
    <Autocomplete
      label={label}
      variant="flat"
      defaultItems={data}
      placeholder={placeholder || ""}
      selectedKey={value}
      isRequired
      size="md"
      isDisabled={isDisabled}
      onSelectionChange={setValue}
      classNames={{
        base: "w-3/5 bg-white rounded-md",
        selectorButton: "text-ucla-blue font-bold",
        clearButton: "text-ucla-blue font-semibold",
        popoverContent: "bg-ucla-blue font-bold",
      }}
    >
      {(item) => (
        <AutocompleteItem key={item.label} className='text-ucla-gold data-[hover]:text-black'>
          {item.label}
        </AutocompleteItem>
      )}
    </Autocomplete>
  )
}
