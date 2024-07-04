import React from 'react'
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export const StyledAutocomplete = ({data, value, setValue, label, placeholder}) => {
  return (
    <Autocomplete
      label={label}
      variant="flat"
      defaultItems={data}
      placeholder={placeholder || ""}
      selectedKey={value}
      isRequired
      size="md"
      onSelectionChange={setValue}
      classNames={{
        base: "w-[400px] bg-white text-black rounded-md",
        selectorButton: "text-ucla-blue font-bold",
        clearButton: "text-ucla-blue font-semibold",
        popoverContent: "bg-ucla-blue text-ucla-gold font-bold"
      }}
    >
      {(item) => (
        <AutocompleteItem key={item.label} className="text-black">
          {item.label}
        </AutocompleteItem>
      )}
    </Autocomplete>
  )
}
