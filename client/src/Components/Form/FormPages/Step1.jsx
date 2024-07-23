// import React from "react";
// import { useFormContext } from "../../../Context/StepContext";
// import courses from "../../../Data/courses";
// import axios from "axios";
// import { StyledAutocomplete, StyledButton } from "../../UIComponents";

// export const Step1 = () => {
//   const {
//     formData,
//     setFormData,
//     setIsLoading,
//     setLoadingText,
//     handleGenericFieldChange, // todo: integrate this; fix styled autocomplete error
//   } = useFormContext();

//   const handleMajorChange = (selectedValue) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       major: selectedValue,
//     }));
//     console.log(selectedValue);
//   };

//   const handleProfessorChange = (selectedValue) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       professor: selectedValue,
//     }));
//   };

//   const fetchProfessorsForMajor = async () => {
//     const selectedCourse = courses.find(
//       (course) => course.label === formData.major,
//     );
//     let url = `https://pl821nzzaa.execute-api.us-west-1.amazonaws.com/prod/instructors?abbr=${formData.major.replace(/\s/g, "+")}&major=${selectedCourse.value.replace(/\s/g, "+")}&term=24F`;
//     setLoadingText(`Fetching professors for ${formData.major}...`);
//     setIsLoading(true);
//     axios({
//       url: url,
//       method: "GET",
//     })
//       .then((res) => {
//         const rawData = res.data;
//         setIsLoading(false);
//         setLoadingText("");
//         const formattedData = rawData
//           .filter((item) => item !== "noop")
//           .map((item) => ({
//             label: item,
//             value: item,
//           }));
//         setFormData((prevData) => ({
//           ...prevData,
//           professors: formattedData,
//         }));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <div className="flex flex-col gap-8 w-full">
//       <div className="flex flex-row justify-between w-3/5 mx-auto items-center">
//         <StyledAutocomplete
//           placeholder="Pick a major"
//           label="Pick a major"
//           value={formData.major}
//           setValue={handleMajorChange}
//           data={courses}
//         />
//         <StyledButton
//           onPress={() => fetchProfessorsForMajor()}
//           isButtonDisabled={!formData.major}
//           text="Search"
//         />
//       </div>
//       <div
//         className={`flex flex-row w-1/2 mx-auto items-center justify-center `}
//       >
//         <StyledAutocomplete
//           placeholder="Pick a professor"
//           label="Choose a professor"
//           isDisabled={!formData.professors.length > 0}
//           value={formData.professor}
//           setValue={handleProfessorChange}
//           data={formData.professors}
//         />
//       </div>
//     </div>
//   );
// };
