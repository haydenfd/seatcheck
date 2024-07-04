import React, { useState } from "react";
import {Spinner } from "@nextui-org/react";
import courses from "./Data/courses";
import axios from "axios";
import { CourseTable } from "./Components/CourseTable/CourseTable";
import { StyledButton } from "./Components/StyledButton/StyledButton";
import { StyledAutocomplete } from "./Components/StyledAutocomplete/StyledAutocomplete";

export function CourseSelect() {
  const [value, setValue] = useState("");
  const [profChoice, setProfChoice] = useState("");
  const [prof, setProf] = useState([]);
  const [profCourses, setProfCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSecondClick = async () => {
    setLoading(true);

    let courses_url = `https://pl821nzzaa.execute-api.us-west-1.amazonaws.com/prod/courses?instructorName=${profChoice.replace(/ /g, '+').replace(/,/g, '%2C')}&term=24F`;

    axios({
      url: courses_url,
      method: 'GET',
    })
    .then(res => {
      setProfCourses(res.data);
      // console.log(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
    });
  }

  const onClick = async () => {
    setLoading(true);
    const selectedCourse = courses.find((course) => course.label === value);

    let url = `https://pl821nzzaa.execute-api.us-west-1.amazonaws.com/prod/instructors?abbr=${value.replace(/\s/g, '+')}&major=${selectedCourse.value.replace(/\s/g, '+')}&term=24F`;
    console.log(url);
    axios({
      url: url,
      method: "GET",
    })
      .then((res) => {
        const rawData = res.data;

        const formattedData = rawData
          .filter(item => item !== 'noop')  // Filter out the "noop" item
          .map(item => ({
            label: item,
            value: item
          }));
        setProf(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <div className="relative flex w-screen flex-col gap-2">
      {loading && (
        <div className="absolute h-max inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
          <Spinner size="lg" />
        </div>
      )}
      <StyledAutocomplete data={courses} value={value} setValue={setValue} label="Choose major" placeholder="Pick a major"/>
  
      <StyledButton onPress={onClick} text="Search major's instructors"/>
      {prof.length > 0 && (
        <>
          <StyledAutocomplete data={prof} value={profChoice} setValue={setProfChoice} label="Choose instructor" placeholder="Pick an instructor"/>

          <StyledButton onPress={onSecondClick} text="Fetch instructor's offerings"/>
        </>
      )}
      {profCourses.length > 0 && <CourseTable rows={profCourses}/>}
    </div>
  );
}
