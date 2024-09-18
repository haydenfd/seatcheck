import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { StyledModal } from "@/components/ui/modal";
import { StyledButton } from "@/components/ui/styled-button";
import { StyledInput } from "@/components/ui/styled-input";
import { useStepContext } from "@/context/stepcontext";

export const Step1 = () => {
  const { nextStep, prevStep, step, direction, isFirstRender } = useStepContext();
  
  const slideInVariants = {
    initial: (direction) => ({
      x: direction === "next" ? 1000 : -1000,
      opacity: 0,
    }),
    animate: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction === "next" ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <>
      <StyledModal />
      {/* <motion.div
        key={step}
        custom={direction}
        initial={isFirstRender ? {} : "initial"} // No animation on first render
        animate="animate"
        exit="exit"
        variants={slideInVariants}
        transition={{ duration: 0.5 }}
      > */}
        <div className="flex flex-col gap-8 w-full ">
          <StyledInput
            label="Enter course URL"
            placeholder="https://sa.ucla.edu/ro/Public/SOC/Results/ClassDetail..."
          />
        </div>
      {/* </motion.div> */}
    </>
  );
};
