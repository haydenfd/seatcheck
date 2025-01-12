import React, { useEffect, useState } from "react";

import {Autocomplete,AutocompleteSection,AutocompleteItem} from "@nextui-org/autocomplete";
import { Select } from "@nextui-org/react";
import { SelectItem } from "@nextui-org/react";
import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import majors from './majors.json'

import { getApiEndpoint } from "@/api";
import { StyledButton } from "@/components/ui/styled-button";
import { StyledInput } from "@/components/ui/styled-input";
import { useLoadingContext } from "@/context/loadingcontext";
import { useStepContext } from "@/context/stepcontext";
import {setCourseAnalysisData} from '@/store/course-analysis-slice';
import { mutateCourseUrl } from "@/store/form-slice";

const terms = [
  {key: "24F", label: "Fall 2024 "},
  {key: "24W", label: "Winter 2024"},
  {key: "25W", label: "Winter 2025"},
  {key: "25S", label: "Spring 2025"},
  {key: "251", label: "Summer Session 2025"},
];

const major_options = [
  {key: "COMSCI0031", label: "COM SCI 31"},
  {key: "COMSCI0032", label: "COM SCI 32"},
  {key: "COMSCI033", label: "COM SCI 33"},
]

export const Step1 = () => {


  // term - string. 
  // dept - string. 
  // course - string. All 3 chosen by user. term and dept affect course. So, course is affected by the combos of term and dept, list of courses to pick a course from renders dynamically. user stores one of the courses in this variable. Need to fill in all 3 to pass to next step of form

  const [formData, setFormData] = useState({
    "term": "",
    "dept": "",
    "course": "",
  })

  const handleFormDataFieldChange = (key, val) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: val
    }));
  }

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

  useEffect(() => {
    if (formData.term && formData.dept) {
      console.log("Filled values:", formData.term, formData.dept);
    }
  }, [formData.term, formData.dept]); 


  const handleNext = () => {


    // const encoded_url = encodeURIComponent(url);
    // const endpoint = getApiEndpoint("course",{
    //   url: encoded_url
    // });
    
    // if (url === course_url) {
    //   nextStep();
    // }
    // else {
      
    //   setToLoad();
    //   const response = (await axios.get(endpoint).catch(function (error) {
    //     if (error.response) {
    //       setLoaded();
    //       console.log('failed');
    //     }
    //   }));
      
    //   if (response.status) {
    //     setLoaded();
    //     dispatch(
    //       mutateCourseUrl({
    //         course_url: url
    //       }))

    //     }
        
    //     console.log(response.data);
    //     if (response.status === 200) {
    //       dispatch(setCourseAnalysisData(response.data));
    //       nextStep();
    //     } else {
    //       console.log('Response was not 200'); 
    //     }
    //   }
    console.log(formData)
  }


  return (
    <>
      {/* <StyledModal /> */}
      {/* <motion.div
        key={step}
        custom={direction}
        initial={isFirstRender ? {} : "initial"} // No animation on first render
        animate="animate"
        exit="exit"
        variants={slideInVariants}
        transition={{ duration: 0.5 }}
      > */}
        <div className="flex flex-col gap-8 w-full">
          {/* <StyledInput
            label="Enter course URL"
            placeholder="https://sa.ucla.edu/ro/Public/SOC/Results/ClassDetail..."
            inputState={url}
            setInputState={setUrl}
            isClearable={true}
          
          /> */}
        <Select
            className="w-60 mx-auto"
            items={terms}
            label="Choose term"
            placeholder="Select a term"
            isRequired
            onSelectionChange={(value) => {
              handleFormDataFieldChange("term", value);
            }}          
            >
            {(term) => <SelectItem>{term.label}</SelectItem>}
          </Select>
          <Autocomplete
            className="mx-auto"
            defaultItems={majors}
            label="Choose department"
            placeholder="Search for a department"
            isRequired
            onSelectionChange={(value) => handleFormDataFieldChange("dept", value)}
          >
          {(major) => <AutocompleteItem key={major.key}>{major.label}</AutocompleteItem>}
    </Autocomplete>          
    <Autocomplete
            className="mx-auto"
            defaultItems={major_options}
            label="Choose course"
            placeholder="Search for a course"
            isRequired
            onSelectionChange={(value) => handleFormDataFieldChange("course", value)}
          >
          {(course) => <AutocompleteItem key={course.key}>{course.label}</AutocompleteItem>}
    </Autocomplete>         
        </div>
        <div className="mx-auto my-6">
            <StyledButton text={step === 3? "Submit" : "Next"} onPress={handleNext}/>
        </div>
      {/* </motion.div> */}
    </>
  );
};
