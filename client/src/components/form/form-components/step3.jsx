import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledButton } from "@/components/ui/styled-button";
import { StyledInput } from "@/components/ui/styled-input";
import { mutatePersonalDetails } from "@/store/form-slice";
import { useStepContext } from "@/context/stepcontext";
import { StyledModal } from "@/components/ui/modal";
import axios from "axios";

export const Step3 = ({ setVisible }) => {

  const dispatch = useDispatch();
  const store_form = useSelector((state) => state.form);
  const store_course_analysis = useSelector((state) => state.courseAnalysis);

  const { prevStep } = useStepContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmationEmail, setConfirmationEmail] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const launchModal = () => setModalOpen(true);



  const [isEmailValid, setIsEmailValid] = useState(true);

  const isValidEmail = (_email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(_email);
  };

  const doesConfirmationEmailMatch = () => email.trim() === confirmationEmail.trim();

  function isEmptyOrSpaces(str) {
    return str === "" || str.match(/^ *$/) !== null;
  }

  const canUserSubmit = useMemo(() => {
    return !isEmptyOrSpaces(name) && !isEmptyOrSpaces(email) && !isEmptyOrSpaces(confirmationEmail);
  }, [name, email, confirmationEmail]);

  const handleSubmit = async () => {
    const emailValid = isValidEmail(email);

    if (!emailValid) {
      setIsEmailValid(false);
      setEmail("");
    } else if (!doesConfirmationEmailMatch()) {
      setConfirmationEmail("");
      // may need state for is valid here...
    } 
    else {
      setIsEmailValid(true);
      const personalDetailsPayload = {
        name: name,
        email: email,
      };

      dispatch(mutatePersonalDetails(personalDetailsPayload));

      // send info to Lambda function to add to mongoDB instance

      // console.log(`Form: ${JSON.stringify(store_form)}`);
      const response = await axios.post(
        `https://pl821nzzaa.execute-api.us-west-1.amazonaws.com/prod/tracking`, {
            form: store_form,
            course_analysis: store_course_analysis,
        });

      console.log(response.data);

      // assume successful response
      setModalTitle("Success! You're all set");
      setModalBody(`Hey ${name}, your tracking for X course has been set up. You should have received a confirmation email from us (check spam, too). Thanks for using SeatCheck!`);
      setModalType("success");
      launchModal();
      // setVisible(false);

    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
        <StyledModal
          isOpen={modalOpen}
          onOpenChange={setModalOpen}
          title={modalTitle}
          body={modalBody}
          type={modalType}
      />
      <p className="w-3/4 mx-auto text-md font-medium text-center">You must fill out all the fields to submit the form</p>
      <div className="w-3/4 mx-auto">
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
          isInvalid={!doesConfirmationEmailMatch}
          isClearable={true}
        />
      </div>
      <div>
        <StyledButton
          onPress={prevStep}
          isButtonDisabled={false}
          text="Previous"
          classes="w-1/2 flex-1"
        />
        <StyledButton
          onPress={handleSubmit}
          isButtonDisabled={!canUserSubmit}
          text="Submit"
          classes="w-1/2 flex-1"
        />
      </div>
    </div>
  );
};
