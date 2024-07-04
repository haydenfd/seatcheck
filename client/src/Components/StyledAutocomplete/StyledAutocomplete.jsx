import React from 'react'
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export const StyledAutocomplete = ({data, value, setValue}) => {
  return (
    <Autocomplete
      label="Course"
      variant="flat"
      defaultItems={data}
      placeholder="Pick a course"
      selectedKey={value}
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
