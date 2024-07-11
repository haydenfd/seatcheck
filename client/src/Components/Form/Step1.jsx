import React, { useEffect, useState } from 'react'
import { StyledAutocomplete } from '../StyledAutocomplete/StyledAutocomplete'
import { useFormContext } from '../../Context/FormContext'
import courses from '../../Data/courses';
import { StyledButton } from '../StyledButton/StyledButton';
import axios from "axios";

export const Step1 = () => {
    const {
        formData, 
        setFormData,
    } = useFormContext();
    

    const handleMajorChange = (selectedValue) => {
        setFormData(prevData => ({
          ...prevData,
          major: selectedValue
        }));
      };
    
    const handleProfessorChange = (selectedValue) => {
    setFormData(prevData => ({
        ...prevData,
        professor: selectedValue
    }));
    };

    const fetchProfessorsForMajor = async () => {
        const selectedCourse = courses.find((course) => course.label === formData.major);
        console.log(formData); 
        let url = `https://pl821nzzaa.execute-api.us-west-1.amazonaws.com/prod/instructors?abbr=${formData.major.replace(/\s/g, '+')}&major=${selectedCourse.value.replace(/\s/g, '+')}&term=24F`;
        axios({
          url: url,
          method: "GET",
        })
          .then((res) => {
            const rawData = res.data;
    
            const formattedData = rawData
              .filter(item => item !== 'noop')  
              .map(item => ({
                label: item,
                value: item
              }));
              setFormData(prevData => ({
                ...prevData,
                professors: formattedData
              }));
                 
             })
          .catch((err) => {
            console.log(err);
          });
    }

      
  return (
    <div className='flex flex-col gap-8 w-full'>
      <div className='flex flex-row justify-between w-4/5 mx-auto bg-red-400 items-center'>
        <StyledAutocomplete placeholder="Pick a major" label="Pick a major" value={formData.major} setValue={handleMajorChange} data={courses}/>
        <StyledButton onPress={() => fetchProfessorsForMajor()} isButtonDisabled={!(formData.major)} text="Search"/>
      </div>
      <div className={`flex flex-row justify-between w-4/5 mx-auto bg-red-400 items-center `}>
        <StyledAutocomplete placeholder="Pick a professor" label="Choose a professor" isDisabled={!formData.professors.length > 0} value={formData.professor} setValue={handleProfessorChange} data={formData.professors}/>
        {/* <StyledButton onPress={() => fetchProfessorsForMajor()} isButtonDisabled={!(formData.major && formData.professor)} text="Search"/> */}
        {/* <StyledAutocomplete placeholder="Pick a major" label="Pick a major" value={formData.major} setValue={handleMajorChange} data={courses}/>
        <StyledButton onPress={() => console.log("Hello")} isButtonDisabled={!(formData.major)} text="Search"/> */}
      </div>
      <button onClick={() => console.log(formData.professors)}>lol</button>
    </div>    
  )
}
