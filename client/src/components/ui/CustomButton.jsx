import React from 'react'

import { Button } from '@heroui/react'

export const CustomButton = ({
    onButtonPress=()=>{},
    displayText="",
    customClasses="",
    isButtonDisabled=false,
}) => {
    return (
        <Button
        isDisabled={isButtonDisabled}
        onPress={onButtonPress}
        className={`px-4 py-2 bg-[#005587] hover:text-[#005587] transition-all duration-200 border-2 border-transparent hover:border-[#005587] text-medium hover:bg-[#ffd100] text-[#FFD100] rounded ${customClasses}`}
        >
        {displayText}
        </Button>
    )
}
