import React, { useState, useMemo, useEffect } from "react";

import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { StyledModal } from "@/components/ui/modal";
import { StyledButton } from "@/components/ui/styled-button";
import { StyledInput } from "@/components/ui/styled-input";
import { useStepContext } from "@/context/stepcontext";
import { mutatePersonalDetails } from "@/store/form-slice";
import {
  isValidEmail,
  isStringEmptyOrSpaces,
  emailMatchesConfirmationEmail,
} from "@/utils/form-validator";

export const Step3 = ({ setVisible }) => {
  const dispatch = useDispatch();
  const store_form = useSelector((state) => state.form);
  const store_course_analysis = useSelector((state) => state.courseAnalysis);

  const { prevStep, direction } = useStepContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  useEffect(() => {
    console.log(store_form)
    if (store_form.name !== '') {
      // setName(name);
      console.log(`name is ${store_form.name}`)
      setName(store_form.name);
    }

    if (store_form.email !== '') {
      setEmail(store_form.email);
    }

    if (store_form.confirmation_email !== '') {
      setConfirmationEmail(store_form.confirmation_email);
    }

    // if (store_form.confirmation_email !== '') {
    //   setConfirmationEmail(store_form.confirmation_email);
    // }
  }, [])


  const handlePrev = () => {

    const reduxSave = {};

    if (name !== "") {
      reduxSave['name'] = name;
    }

    if (email !== "") {
      reduxSave['email'] = email;
    }

    if (confirmationEmail !== "") {
      reduxSave['confirmation_email'] = confirmationEmail
    }

    dispatch(mutatePersonalDetails(reduxSave))
    prevStep();
  }


  const canUserSubmit = useMemo(() => {
    return (
      !isStringEmptyOrSpaces(name) &&
      !isStringEmptyOrSpaces(email) &&
      !isStringEmptyOrSpaces(confirmationEmail)
    );
  }, [name, email, confirmationEmail]);

  const launchModal = () => setModalOpen(true);

 
  const handleSubmit = async () => {
    const emailValid = isValidEmail(email);

    if (!emailValid) {
      setIsEmailValid(false);
      setEmail("");
    } else if (!emailMatchesConfirmationEmail(email, confirmationEmail)) {
      setConfirmationEmail("");
    } else {
      setIsEmailValid(true);
      const personalDetailsPayload = {
        name: name,
        email: email,
      };

      dispatch(mutatePersonalDetails(personalDetailsPayload));

      const body = {
        form: store_form,
        course_analysis: store_course_analysis,
        name: name,
        email: email,
      };

      const response = await axios.post(
        `https://pl821nzzaa.execute-api.us-west-1.amazonaws.com/prod/tracking`,
        body
      );

      setModalTitle("Success! You're all set");
      setModalBody(
        `Hey ${name}, your tracking for X course has been set up. You should have received a confirmation email from us (check spam, too). Thanks for using SeatCheck!`
      );
      setModalType("success");
      launchModal();
      setVisible(false);
    }
  };

  // Define the motion variants for sliding between steps
  const slideInVariants = {
    initial: (direction) => ({
      x: direction === "next" ? 1000 : -1000, // Slide from right when moving forward
      opacity: 0,
    }),
    animate: { x: 0, opacity: 1 }, // Slide into place
    exit: (direction) => ({
      x: direction === "next" ? -1000 : 1000, // Slide to left when going back
      opacity: 0,
    }),
  };

  return (
    
    <>
       {/*
       </><motion.div
      key="step3"
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideInVariants}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4 overflow-hidden" 
    >
    */}
    <StyledModal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        title={modalTitle}
        body={modalBody}
        type={modalType}
      /> 
      <p className="w-3/4 mx-auto text-md font-medium text-center overflow-hidden">
        You must fill out all the fields to submit the form
      </p>
      <div className="w-3/4 mx-auto overflow-hidden">
        <StyledInput
          label="Enter your name"
          placeholder="Joe Bruin"
          inputState={name}
          setInputState={setName}
          isClearable={true}
        />
        <StyledInput
          label="Enter your email address"
          placeholder="skobru@ucla.edu"
          errorMessage="Please enter a valid email!"
          inputState={email}
          setInputState={setEmail}
          isInvalid={!isEmailValid}
          isClearable={true}
        />
        <StyledInput
          label="Confirm your email address"
          placeholder="skobru@ucla.edu"
          inputState={confirmationEmail}
          setInputState={setConfirmationEmail}
          // isInvalid={!emailMatchesConfirmationEmail(email, confirmationEmail)}
          isClearable={true}
        />
      </div>
      <div className="ml-auto my-6">
            <StyledButton text="Prev" onPress={handlePrev} classes="mr-6"/>
            <StyledButton text="Submit" onPress={handleSubmit}/>
      </div>
      </>
  );
};
