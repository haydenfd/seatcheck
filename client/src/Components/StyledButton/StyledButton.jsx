import React from 'react';
import { Button } from '@nextui-org/react';

export const StyledButton = ({ onPress, text, ...props }) => {
  return (
    <Button
      onPress={onPress}
      className="w-[300px] mx-auto bg-ucla-blue text-white border-2 border-transparent rounded-none hover:border-ucla-blue p-4 hover:bg-ucla-gold hover:text-ucla-blue transition-all duration-300 ease-in-out"
      {...props}
    >
      {text}
    </Button>
  );
};