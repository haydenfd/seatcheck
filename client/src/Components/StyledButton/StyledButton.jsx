import React from 'react';
import { Button } from '@nextui-org/react';

export const StyledButton = ({ onPress, text, isButtonDisabled = false, ...props }) => {
  return (
    <Button
      onPress={onPress}
      isDisabled={isButtonDisabled}
      className= {`cursor-pointer mx-auto bg-ucla-blue text-white border-2 border-transparent rounded-md hover:border-ucla-blue p-2 hover:bg-ucla-gold hover:text-ucla-blue transition-all duration-300 ease-in-out py-6`}
  
    >
      {text}
    </Button>
  );
};
