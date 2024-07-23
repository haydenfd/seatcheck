import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledButton } from "@/components/ui/styled-button";
import { StyledInput } from "@/components/ui/styled-input";
import { mutateCourseUrl } from "@/store/form-slice";
import { useStepContext } from "@/context/stepcontext";

export const Step1 = () => {

  const { nextStep } = useStepContext();
  const store_url = useSelector((state) => state.form.course_url);

  const [url, setUrl] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (store_url) {
      setUrl(store_url);
    }
  }, []);
  
  const urlValidator = (str) => {
    const regex = /^https:\/\/(www\.)?sa\.ucla\.edu\/ro\/Public\/SOC\/Results\/ClassDetail\?.+/;
    return regex.test(url);
  }

  const handleSubmit = () => {
    if (urlValidator(url)) {
      setIsUrlValid(true);
      dispatch(mutateCourseUrl({
        course_url: url,
      }))
      nextStep();
    } else {
      setIsUrlValid(false);

    }
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <StyledInput
        label="Enter course URL"
        placeholder="https://sa.ucla.edu/ro/Public/SOC/Results/ClassDetail..."
        inputState={url}
        setInputState={setUrl}
        isInvalid={!isUrlValid}
        errorMessage="Please enter a valid URL"
        isClearable={true}
      />
      <div>
         <StyledButton
            onPress={() => {}}
            isButtonDisabled={true}
            text="Previous"
            classes="w-1/2 flex-1"
          />
          <StyledButton
            onPress={handleSubmit}
            isButtonDisabled={false}
            text="Next"
            classes="w-1/2 flex-1"
          />        
      </div>
    </div>
  );
};