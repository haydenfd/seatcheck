import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
} from "@nextui-org/react";
import { Step3 } from "@/Components/Form/FormComponents/Step3";
import { Step1 } from "@/Components/Form/FormComponents/Step1";
import { Step2 } from "@/Components/Form/FormComponents/Step2";
import { useStepContext } from "@/Context/StepContext";
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

// import React from 'react';
// import { useFormContext } from '../../Context/FormContext';
// import * as FormSteps from './FormPages';
// import {Card, CardHeader, CardBody, CardFooter, Divider, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
// import { motion } from 'framer-motion';
// import { StyledButton } from '../UIComponents';

// export const Form = ({isVisible}) => {
//     const {
//         formData,
//         step,
//         gotoPrevStep,
//         gotoNextStep,
//         canPrev1,
//         canPrev2,
//         canNext2,
//         canNext3,
//         titles,
//         isFormGoodToSubmit
//     } = useFormContext();

//     const {isOpen, onOpen, onOpenChange} = useDisclosure();

// const slideInVariants = {
//     hidden: { x: '-100%', opacity: 0 },
//     visible: { x: 0, opacity: 1 }
// };

//   return (
// <motion.div
// initial="hidden"
// animate={isVisible ? 'visible' : 'hidden'}
// variants={slideInVariants}
// transition={{ duration: 0.5 }}
// >
// <Card className={`w-2/3 text-black bg-white rounded-md mx-auto flex flex-col shadow-lg ${isVisible ? 'visible' : 'invisible'}`}>
//     <CardHeader className='flex justify-center items-center text-center font-bold text-xl rounded-none bg-ucla-blue text-ucla-gold'>
//         Step {step}/3: {titles[step - 1]}
//     </CardHeader>
//     <Divider/>
//     <CardBody className='my-8 flex flex-col justify-center items-center'>
//     { step === 1 && <FormSteps.Step1 />}
//     { step === 2 && <FormSteps.Step2 professor={formData.professor}/>}
//     { step === 3 && <FormSteps.Step3 />}
//     </CardBody>
//     <Divider/>
//     <CardFooter className='flex flex-row justify-between w-full mx-auto bg-ucla-blue rounded-none'>
// <StyledButton onPress={() => gotoPrevStep()} isButtonDisabled={!(canPrev1 || canPrev2)} text="Prev"/>
// <StyledButton onPress={step === 3? () => onOpen() : () => gotoNextStep()} isButtonDisabled={!(canNext2 || canNext3 || isFormGoodToSubmit())} text={`${step === 3 ? "Finish" : "Submit"}`}/>
//     </CardFooter>
//             <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
//             <ModalContent>
//             {(onClose) => (
//                 <>
//                 {
//                     console.log(formData)
//                 }
//                 <ModalHeader className="flex flex-col gap-1">Confirmation</ModalHeader>
//                 <Divider/>
//                 <ModalBody>
//                     <h3>Thanks, {formData.name}</h3>
//                     <p>
//                     We just sent you an email at {formData.email} to confirm that tracking for course X has been set up!
//                     </p>
//                 </ModalBody>
//                 <ModalFooter>
//                 <StyledButton onPress={onClose} text="Close"/>
//                 </ModalFooter>
//                 </>
//             )}
//             </ModalContent>
//         </Modal>
//         </Card>
//     </motion.div>
//   )
// }
