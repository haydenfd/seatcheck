import React, { useEffect, useState } from "react";

import {Autocomplete,AutocompleteSection,AutocompleteItem} from "@heroui/autocomplete";
import { Select } from "@heroui/react";
import { SelectItem } from "@heroui/react";
import axios from "axios";
import { motion } from "framer-motion";
import { ImArrowRight, ImArrowLeft} from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";


import majors from './majors.json'

import { getApiEndpoint } from "@/api";
import { StyledButton } from "@/components/ui/styled-button";
import { StyledInput } from "@/components/ui/styled-input";
import { useLoadingContext } from "@/context/loadingcontext";
import { useStepContext } from "@/context/stepcontext";
import { updateStepData } from "@/store/form-slice";
// import { mutateCourseUrl } from "@/store/form-slice";

const terms = [
  {key: "25W", label: "Winter 2025"},
  {key: "25S", label: "Spring 2025"},
  {key: "251", label: "Summer Session 2025"},
];


export const Step1 = () => {


  const dispatch = useDispatch();
  // term - string. 
  // dept - string. 
  // course - string. All 3 chosen by user. term and dept affect course. So, course is affected by the combos of term and dept, list of courses to pick a course from renders dynamically. user stores one of the courses in this variable. Need to fill in all 3 to pass to next step of form

  const redux_form_step_1 = useSelector(state => state.form.step_1)

  const [formData, setFormData] = useState({
    "term_cd": "",
    "subj_area_name": "",
    "course": "",
    "subj_area_cd":"",
    "crs_catlg_no":"",
    "class_id": "",
    "class_no": "",
    "lecture":"",
  })
  // list of departments - so majors.json. 
  // Chosen department - so, formData.course.
  // list of terms. 
  // term_cd. 
  // class_id. 
  // crs_catalog_no
  // subj_area_cd
  // course.
  // subj_area_cd.

  const [courseData,setCourseData] = useState([]);
  const [lectureOptions, setLectureOptions] = useState([]);

  const handleFormDataFieldChange = (key, val) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: val
    }));
  }

  const { nextStep, prevStep, step, direction, isFirstRender } = useStepContext();
  const {setToLoad, setLoaded} = useLoadingContext();
  const course_url = useSelector((state) => state.form.course_url);

  // const [url, setUrl] = useState("https://sa.ucla.edu/ro/Public/SOC/Results/ClassDetail?term_cd=24F&subj_area_cd=COM%20SCI&crs_catlg_no=0001%20%20%20%20&class_id=187003200&class_no=%20001%20%20");


  // useEffect(() => { 
   
  // },[formData.course] )
  useEffect(() => {
    if (formData.term_cd && formData.subj_area_name && formData.subj_area_cd) {
      // const it = formData.term.values().next().value
      // const x = `${formData.subjAreaName} (${formData.subjAreaCode})`
      const url = "https://pl821nzzaa.execute-api.us-west-1.amazonaws.com/prod/bar"
      console.log("Ran")
      fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json(); 
    })
    .then((data) => {
      
      const processCourseList = (courses, pattern="MATH") => {

        let res = []
        for (let course of courses) {
          const course_number = course.course_id;
          const number_str = course_number.slice(pattern.length);
          const firstNonZeroIndex = number_str.search(/[^0]/);
          const firstZeroIndex = number_str.indexOf("0");
          const afterZero = number_str.slice(firstZeroIndex);
          const number = number_str.slice(firstNonZeroIndex);

          res.push({
            key: course.base_id,
            label: `${pattern} ${number}`,
            num_lectures: course.num_lectures,
            crs_catlg_no: `${afterZero}`,
          })

        }
        return res;
      }

      const process = processCourseList(data);
      console.log(process);
      setCourseData(process);
    
    })
    .catch((error) => { 
      console.error("Fetch error:", error.message);
    });
    }


  }, [formData.term_cd, formData.subj_area_name, formData.subj_area_cd]); 


  useEffect(() => {

    function createMapping(n) {
      const mapping = [];
      for (let i = 1; i <= n; i++) {
        mapping.push({ key: i.toString(), label: `Lecture ${i.toString()}` }); 
      }
      return mapping;
    }

    if (formData.course) {
      const obj = courseData.find(item => item.key === formData.course)
      console.log(obj)
      handleFormDataFieldChange("crs_catlg_no", obj.crs_catlg_no)
      let res = createMapping(obj.num_lectures);
      setLectureOptions(res);
    }
    
  }, [formData.course])

  const handleStep1Submit = () => {

    setToLoad();

    setTimeout(() => {
      console.log("Simulating lambda call...");
      setLoaded();
      nextStep();
    }, 2000)

  }


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
      {/* <motion.div
        key={step}
        custom={direction}
        initial={isFirstRender ? {} : "initial"} // No animation on first render
        animate="animate"
        exit="exit"
        variants={slideInVariants}
        transition={{ duration: 0.5 }}
      > */}
        <div className="flex flex-col gap-8 w-full mt-8">
          <div className="flex flex-row-reverse gap-8 items-center">
            <Select
              className="flex-none w-[35%] h-full"
              classNames={{
                label: "font-open italic",
                trigger: "border-2 border-black rounded-xl bg-white",
                popoverContent: "border-2 border-black rounded-xl mt-1",
                }}
              items={terms}
              label="Choose term"
              placeholder="Select a term"
              isRequired
              onSelectionChange={(value) => {

                handleFormDataFieldChange("term_cd", value.values().next().value);
              }}          
              >
              {(term) => <SelectItem>{term.label}</SelectItem>}
            </Select>
            <Autocomplete
              className="flex-auto w-[65%] h-full"
              classNames={{
                base: "font-open italic border-2 border-black rounded-xl bg-white",
                }}
              defaultItems={majors}
              label="Choose department"
              placeholder="Search for a department"
              isRequired
              onSelectionChange={(value) => {
                handleFormDataFieldChange("subj_area_cd", value)
                const match = majors.find((item) => item.key === value);
                handleFormDataFieldChange("subj_area_name", match?.label);
              }}
            >
            {(major) => <AutocompleteItem key={major.key}>{major.key}</AutocompleteItem>}
      </Autocomplete>          
      
          </div>
          <div className="flex flex-row gap-8 items-center">

    <Autocomplete
              className="flex-auto w-[65%] h-full"
              classNames={{
                base: "font-open italic border-2 border-black rounded-xl bg-white",
                }}
              defaultItems={courseData}
              label="Choose course"
              placeholder="Search for a course"
              isRequired
              isDisabled={courseData.length === 0}
              onSelectionChange={(value) => {
                handleFormDataFieldChange("course", value)
                console.log(value);
              }}
            >
            {(course) => <AutocompleteItem key={course.key}>{course.label}</AutocompleteItem>}
      </Autocomplete> 
    <Select
            className="flex-none w-[35%] h-full"
            classNames={{
              label: "font-open italic",
              trigger: `border-2 rounded-xl bg-white ${lectureOptions.length === 0 ? "border-blue-600" : "border-black"}`,
              }}
            items={lectureOptions}
            label="Choose lecture"
            placeholder="Select a lecture"
            isRequired
            isDisabled={lectureOptions.length === 0}
            onSelectionChange={(value) => {
              const num = value.values().next().value;
              console.log(num);
              handleFormDataFieldChange("lecture", num)
              const course = formData.course;
              console.log(num)
              handleFormDataFieldChange("class_no", `00${num}`)
              handleFormDataFieldChange("class_id", `${Number(course) + ((num - 1) * 10)}`)
              // console.log(formData)
            }
            }
        
            >
            {(lecture) => <SelectItem>{lecture.label}</SelectItem>}
          </Select>    
          </div>  
  
        </div>
        <div className="w-full my-6 mx-auto flex justify-between">
          <StyledButton text="Previous" onPress={() => console.log("Hello")} classes="ml-0 w-[50px]" isButtonDisabled isIconOnly icon={<ImArrowLeft className="scale-150"/>}/>
          <StyledButton text="Submit" onPress={() => handleStep1Submit()} classes="mr-0 w-[50px]" isButtonDisabled={false} isIconOnly icon={<ImArrowRight className="scale-150"/>}/>
        </div>
      {/* </motion.div> */}
    </>
  );
};
