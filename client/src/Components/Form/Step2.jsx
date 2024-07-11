import React, { useEffect,useState } from 'react'
import { StyledAutocomplete } from '../StyledAutocomplete/StyledAutocomplete'
import { StyledButton } from '../StyledButton/StyledButton';
import { useFormContext } from '../../Context/FormContext'
import courses from '../../Data/courses';
import axios from 'axios';
export const Step2 = () => {
    const {
        formData, 
        setFormData,
    } = useFormContext();


//     const [professors, setProfessors] = useState([]);

//     const handleProfChange = (selectedValue) => {
//         setFormData(prevData => ({
//           ...prevData,
//           professor: selectedValue
//         }));
//       };

//     const onSecondClick = async () => {

//     let courses_url = `https://pl821nzzaa.execute-api.us-west-1.amazonaws.com/prod/courses?instructorName=${formData.professor.replace(/ /g, '+').replace(/,/g, '%2C')}&term=24F`;

//     axios({
//         url: courses_url,
//         method: 'GET',
//     })
//     .then(res => {
//         console.log(res.data);
//     })
//     .catch(err => {
//         console.log(err);
//     });
//     }

//   const onClick = async () => {
//     const selectedCourse = courses.find((course) => course.label === major);

//     let url = `https://pl821nzzaa.execute-api.us-west-1.amazonaws.com/prod/instructors?abbr=${major.replace(/\s/g, '+')}&major=${selectedCourse.value.replace(/\s/g, '+')}&term=24F`;
//     console.log(url);
//     axios({
//       url: url,
//       method: "GET",
//     })
//       .then((res) => {
//         const rawData = res.data;

//         const formattedData = rawData
//           .filter(item => item !== 'noop')  
//           .map(item => ({
//             label: item,
//             value: item
//           }));
//         setProfessors(formattedData);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//     useEffect(() => {
//         onClick();
//     }, [])
      
  return (
      <>
        <div className='flex flex-row justify-start w-5/6 items-center'>
            <p>Hi</p>
        </div>
    </>
  )
}
