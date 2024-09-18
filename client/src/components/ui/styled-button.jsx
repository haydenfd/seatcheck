import React from "react";

import { Button } from "@nextui-org/react";

export const StyledButton = ({
  onPress,
  text,
  isButtonDisabled = false,
  classes = "",
  isVisible = true, // Default visible
}) => {
  return (
    <Button
      onPress={onPress}
      isDisabled={isButtonDisabled}
      className={`${isVisible ? 'visible' : 'invisible'} font-semibold cursor-pointer mx-auto my-0 data-[disabled]:bg-opacity-90 bg-ucla-blue text-white border-2 border-transparent rounded-none hover:border-ucla-blue hover:bg-ucla-gold hover:text-ucla-blue transition-all duration-300 ease-in-out py-5 px-3 ${classes}`}
    >
      {text}
    </Button>
  );
};
