import React from "react";

import { Button } from "@heroui/react";

export const StyledButton = ({
  onPress,
  text,
  isButtonDisabled = false,
  classes = "",
  isIconOnly = false,
  isVisible = true, // Default visible
  icon=<></>,
}) => {
  return (
    <Button
      onPress={onPress}
      isDisabled={isButtonDisabled}
      isIconOnly={isIconOnly}
      className={`${isVisible ? 'visible' : 'invisible'} font-semibold cursor-pointer font-open mx-auto my-0 data-[disabled]:bg-opacity-90 bg-[#005587] text-ucla-gold border-4 border-transparent rounded-lg hover:border-ucla-blue hover:bg-ucla-gold hover:text-ucla-blue transition-all text-lg duration-300 ease-in-out py-6 px-4 ${classes}`}
    >
      {isIconOnly ? icon:text}
    </Button>
  );
};
