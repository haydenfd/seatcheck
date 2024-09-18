import React, { useEffect, useState } from "react";

import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";

import { StyledButton } from "../ui/styled-button";

import { Step1 } from "@/components/form/form-components/step1";
import { Step2 } from "@/components/form/form-components/step2";
import { Step3 } from "@/components/form/form-components/step3";
import { useStepContext } from "@/context/stepcontext";

const titles = [
  "Input course/section URL",
  "Set up tracking notifications",
  "Personal information",
];

export const Form = ({ isVisible, setIsVisible }) => {
  const { step, stepsCompleted, nextStep, prevStep } = useStepContext();

  useEffect(() => {
    console.log(stepsCompleted);
  }, []);

  const slideInVariants = {
    hidden: { y: "100%", opacity: 0 }, // Start from below the screen
    visible: { y: 0, opacity: 1 },     // Animate to its normal position
    exit: { y: "100%", opacity: 0 }    // Exit by sliding back down
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit" 
          variants={slideInVariants}
          transition={{ duration: 0.5 }}
          className="overflow-hidden"
        >
          <Card className="w-1/2 text-black bg-white rounded-none mx-auto flex flex-col shadow-lg pb-0 h-full">
            <CardHeader className="flex justify-center items-center text-center font-bold text-xl rounded-none bg-ucla-blue text-ucla-gold">
              <h1>
                Step {step}: {titles[step - 1]}
              </h1>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col justify-center p-0 mt-4 w-2/3 mx-auto">
              {step === 1 && <Step1 />}
              {step === 2 && <Step2/>}
              {step === 3 && <Step3 setVisible={setIsVisible}/>}
            </CardBody>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
