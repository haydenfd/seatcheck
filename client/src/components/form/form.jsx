import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
} from "@nextui-org/react";
import { Step1 } from "@/components/form/form-components/step1";
import { Step2 } from "@/components/form/form-components/step2";
import { Step3 } from "@/components/form/form-components/step3";
import { useStepContext } from "@/context/stepcontext";
// import { StyledButton } from "@/Components/UIComponents";

const titles = [
  "Input course/section URL",
  "Confirm tracking setting",
  "Personal information",
];

export const Form = () => {
  const { step, nextStep, prevStep, stepsCompleted } =
    useStepContext();

  useEffect(() => {
    console.log(stepsCompleted);
  }, []);

  const slideInVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideInVariants}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-2/3 text-black bg-white rounded-none mx-auto flex flex-col shadow-lg pb-0">
        <CardHeader className="flex justify-center items-center text-center font-bold text-xl rounded-none bg-ucla-blue text-ucla-gold">
          Step {step} : {titles[step - 1]}
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col justify-center items-center p-0 mt-10">
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
        </CardBody>
      </Card>
    </motion.div>
  );
};

