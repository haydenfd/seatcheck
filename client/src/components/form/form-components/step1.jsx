import React, { useEffect, useState } from "react";

import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { getApiEndpoint } from "@/api";
import { StyledModal } from "@/components/ui/modal";
import { StyledButton } from "@/components/ui/styled-button";
import { StyledInput } from "@/components/ui/styled-input";
import { useLoadingContext } from "@/context/loadingcontext";
import { useStepContext } from "@/context/stepcontext";
import {setCourseAnalysisData} from '@/store/course-analysis-slice';
import { mutateCourseUrl } from "@/store/form-slice";
import { isValidCourseUrl } from '@/utils/form-validator';

export const Step1 = () => {
  const { nextStep, prevStep, step, direction, isFirstRender } = useStepContext();
  const {setToLoad, setLoaded} = useLoadingContext();
  const course_url = useSelector((state) => state.form.course_url);

  const dispatch = useDispatch();
  const [url, setUrl] = useState("https://sa.ucla.edu/ro/Public/SOC/Results/ClassDetail?term_cd=24F&subj_area_cd=COM%20SCI&crs_catlg_no=0001%20%20%20%20&class_id=187003200&class_no=%20001%20%20");

  useEffect(() => {
    if (course_url !== "") {
      setUrl(course_url);
    }
  }, []);

  const handleNext = async () => {

    // console.log(`This url is ${isValidCourseUrl(url)}`);

    const encoded_url = encodeURIComponent(url);
    const endpoint = getApiEndpoint("course",{
      url: encoded_url
    });
    
    if (url === course_url) {
      nextStep();
    }
    else {
      
      setToLoad();
      const response = (await axios.get(endpoint).catch(function (error) {
        if (error.response) {
          setLoaded();
          console.log('failed');
        }
      }));
      
      if (response.status) {
        setLoaded();
        dispatch(
          mutateCourseUrl({
            course_url: url
          }))

        }
        
        console.log(response.data);
        if (response.status === 200) {
          dispatch(setCourseAnalysisData(response.data));
          nextStep();
        } else {
          console.log('Response was not 200'); 
        }
      }
  }
  
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
            inputState={url}
            setInputState={setUrl}
            isClearable={true}
          
          />
        </div>
        <div className="ml-auto my-6">
            <StyledButton text={step === 3? "Submit" : "Next"} onPress={handleNext}/>
        </div>
      {/* </motion.div> */}
    </>
  );
};
