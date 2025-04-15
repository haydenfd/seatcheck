import React, { useState, useEffect, useMemo} from 'react'

import { Autocomplete, AutocompleteItem } from '@heroui/react'

import majors from "../form/form-components/majors.json"

import { fetchPosts } from '@/api/axiosClient'
import { Loader } from "@/components/ui/loader" 

const terms = [
  { key: "25W", label: "Winter 2025" },
  { key: "25S", label: "Spring 2025" },
  { key: "251", label: "Summer Session 2025" },
]

export const Step2 = ({ formData, setFormData }) => {
  const [selectedTerm, setSelectedTerm] = useState(null)
  const [selectedDept, setSelectedDept] = useState(null)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [courseOptions, setCourseOptions] = useState([])
  const [lectureOptions, setLectureOptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [courseDropdownEnabled, setCourseDropdownEnabled] = useState(false)
  const [lectureDropdownEnabled, setLectureDropdownEnabled] = useState(false)

  const generateLectureOptions = (course) => {
    const baseId = parseInt(course.key, 10)
    const { num_lectures } = course
  
    return Array.from({ length: num_lectures }, (_, i) => {
      const lectureNum = i + 1
      return {
        key: String(baseId + i * 10),
        class_no: lectureNum.toString().padStart(3, "0"),
        label: `Lecture ${lectureNum}`,
      }
    })
  }
  
  useEffect(() => {
    if (selectedCourse) {
      console.log(selectedCourse)
      console.log(courseOptions)
      const generatedLectureOptions = generateLectureOptions(courseOptions.find(elem => elem.key === selectedCourse))
      console.log(generatedLectureOptions)
      setLectureOptions(generatedLectureOptions)
      setLectureDropdownEnabled(true)
    }
  }, [selectedCourse])

  useEffect(() => {
    if (selectedTerm && selectedDept) {
      setIsLoading(true)
      setCourseDropdownEnabled(false)

      fetchPosts()
        .then(data => {
          const courses = data.map(item => ({
            key: item.base_id,
            num_lectures: item.num_lectures,
            dept: item.course_id.slice(0, item.course_id.search(/0/)),
            label: item.course_id.slice(item.course_id.search(/0/)),
          }))

          console.log(data);
          // const lectures = data.flatMap(item =>
          //   Array.from({ length: item.num_lectures }, (_, i) => ({
          //     key: `${item.course_id}-Lec${i + 1}`,
          //     label: `${item.course_id} - Lecture ${i + 1}`,
          //   }))
          // )

          setCourseOptions(courses)
          // setLectureOptions(lectures)
          setCourseDropdownEnabled(true)

          setFormData(prev => ({
            ...prev,
            courses,
            // lectures,
          }))
        })
        .finally(() => setIsLoading(false))
    }
  }, [selectedTerm, selectedDept])

  

  return (
    <>
      <Loader loading={isLoading} text="Loading course data..." />

      <div className="text-black w-full flex flex-col gap-4">
        <div className="w-full flex gap-4">
          <Autocomplete
            className="w-1/2"
            classNames={{
              base: "font-open italic border-2 border-black rounded-xl bg-white",
              popoverContent: "border-2 border-black rounded-xl mt-1",
            }}
            scrollShadowProps={{ isEnabled: false }}
            defaultItems={terms}
            label="Choose term"
            placeholder="Select a term"
            isRequired
            onSelectionChange={(value) => {
              setSelectedTerm(value)
              setCourseDropdownEnabled(false)
              setFormData(prev => ({ ...prev, term: value }))
            }}
          >
            {(term) => <AutocompleteItem key={term.key}>{term.label}</AutocompleteItem>}
          </Autocomplete>
          <Autocomplete
            className="w-1/2"
            classNames={{
              base: "font-open italic border-2 border-black rounded-xl bg-white",
              popoverContent: "border-2 border-black rounded-xl w-full mt-1",
            }}
            scrollShadowProps={{ isEnabled: false }}
            defaultItems={majors}
            label="Choose department"
            placeholder="Search for a department"
            isRequired
            onSelectionChange={(value) => {
              setSelectedDept(value)
              setCourseDropdownEnabled(false)
              setFormData(prev => ({ ...prev, department: value }))
            }}
          >
            {(item) => <AutocompleteItem key={item.key}>{`${item.label} (${item.key})`}</AutocompleteItem>}
          </Autocomplete>
          </div>
          <div className="w-full flex gap-4">

          <Autocomplete
            isDisabled={!courseDropdownEnabled}
            className="w-1/2"
            classNames={{
              base: "font-open italic border-2 border-black rounded-xl bg-white",
              popoverContent: "border-2 border-black rounded-xl w-full mt-1",
            }}
            scrollShadowProps={{ isEnabled: false }}
            defaultItems={courseOptions}
            label="Choose course"
            placeholder="Pick a course"
            isRequired
            onSelectionChange={(value) => {
              setSelectedCourse(value)
              setFormData(prev => ({ ...prev, course: value }))

            }}
          >
            {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
          </Autocomplete>

          <Autocomplete
            isDisabled={!lectureDropdownEnabled}
            className="w-1/2"
            classNames={{
              base: "font-open italic border-2 border-black rounded-xl bg-white",
              popoverContent: "border-2 border-black rounded-xl w-full mt-1",
            }}
            scrollShadowProps={{ isEnabled: false }}
            defaultItems={lectureOptions}
            label="Choose offering"
            placeholder="Pick an offering"
            isRequired
            onSelectionChange={(value) => {
              console.log(value)
              setFormData(prev => ({ ...prev, offering: value }))
            }}
          >
            {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
          </Autocomplete>
          </div>
      </div>
    </>
  )
}
