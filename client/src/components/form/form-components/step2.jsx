import React, { useEffect, useState } from 'react';

import { ImArrowRight, ImArrowLeft} from "react-icons/im";
import { useSelector, useDispatch } from 'react-redux';

import { StyledButton } from '@/components/ui/styled-button';
import { useLoadingContext } from "@/context/loadingcontext";
import { useStepContext } from "@/context/stepcontext";

export const Step2 = () => {
  
  const dispatch = useDispatch();


    const { nextStep, prevStep, step, direction, isFirstRender } = useStepContext();
    const {setToLoad, setLoaded} = useLoadingContext();
    const redux_form_step_1 = useSelector(state => state.form.step1)
    

  const handleStep2Previous = () => {
    // TODO: Add saving current step 2 data
    prevStep();
  }
  const handleStep2Submit = () => {
    
    nextStep();
  }
  return (
    <div className='flex flex-col gap-2 w-full mt-4 mb-10'>
      <h2 className='mx-auto text-2xl font-bold'>{redux_form_step_1.subj_area_cd} {redux_form_step_1.crs_catlg_no.slice(redux_form_step_1.crs_catlg_no.search(/[^0]/))}, {redux_form_step_1.term_cd}</h2>
      <h3 className='mx-auto text-xl font-semibold'>Lecture {redux_form_step_1.lecture}, PROFESSOR NAME</h3>
      <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-sm rounded-none border-2 border-black mt-8">
  <table className="w-full text-center table-auto min-w-max">
    <thead>
        <tr>
            <th className="p-3 border-b border-slate-300 bg-bg-blue ">
                <p className="text-md font-normal leading-none text-white text-center">
                    Days
                </p>
            </th>
            <th className="p-3 border-b border-slate-300 bg-bg-blue ">
                <p className="block text-md font-normal leading-none text-white text-center">
                    Time
                </p>
            </th>
            <th className="p-3 border-b border-slate-300 bg-bg-blue ">
                <p className="block text-md font-normal leading-none text-white text-center">
                    Class Status
                </p>
            </th>
            <th className="p-3 border-b border-slate-300 bg-bg-blue ">
                <p className="block text-md font-normal leading-none text-white text-center">
                    Waitlist Status
                </p>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr className="hover:bg-slate-50">
            <td className="p-3 border-b border-slate-200">
                <p className="block text-md font-medium text-slate-800 text-center">
                    MWF
                </p>
            </td>
            <td className="p-3 border-b border-slate-200">
                <p className="block text-md font-medium text-slate-800 text-center">
                    8am-8:50am
                </p>
            </td>
            <td className="p-3 border-b border-slate-200">
                <p className="block text-md font-medium text-slate-800 text-center">
                Open: 39 of 41 Enrolled
                </p>
            </td>
            <td className="p-3 border-b border-slate-200">
                <p className="block text-md font-medium text-slate-800 text-center">
                    No Waitlist
                </p>
            </td>
        </tr>
        
    </tbody>
  </table>

</div>

        <div className="w-full my-6 mx-auto flex justify-between">
          <StyledButton text="Previous" onPress={() => handleStep2Previous()} classes="ml-0 w-[50px]" isIconOnly icon={<ImArrowLeft className="scale-150"/>}/>
          <StyledButton text="Submit" onPress={() => handleStep2Submit()} classes="mr-0 w-[50px]" isButtonDisabled={false} isIconOnly icon={<ImArrowRight className="scale-150"/>}/>
        </div>
    </div>
  )
}


// import React, { useEffect, useState } from "react";

// import { CheckboxGroup, Checkbox } from "@heroui/checkbox";
// import { motion } from "framer-motion";
// import { useSelector, useDispatch } from "react-redux";

// import { StyledButton } from "@/components/ui/styled-button";
// import { useStepContext } from "@/context/stepcontext";
// import { setTrackingPreferences } from "@/store/form-slice";

// const options = {
//   "notify-all-seat-changes": "Notify me on all enrollment status changes (ex. Closed to Open, Open to Closed, Open to Waitlist)",
//   "notify-all-waitlist-changes": "Notify me on all waitlist status changes (Full --> Open and Open --> Full)",
// };

// export const Step2 = () => {
//   const dispatch = useDispatch();
  // const store_course_analysis = useSelector((state) => state.courseAnalysis);
//   const store_form = useSelector((state) => state.form);

//   const [optionsState, setOptionsState] = useState({
//     "notify-all-seat-changes": "Notify me on all enrollment status changes (ex. Closed to Open, Open to Closed, Open to Waitlist)",
//   });
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const { nextStep, prevStep, direction } = useStepContext();

//   const addKeyValuePair = (key, value) => {
//     setOptionsState((prevState) => ({ ...prevState, [key]: value }));
//   };

//   useEffect(() => {
//     if (store_form.tracking_preferences.length > 0) {
//       setSelectedOptions(store_form.tracking_preferences);
//     }

//     const key2 = "notify-all-seat-changes";
//     const value2 = options[key2];
//     addKeyValuePair(key2, value2);

//     if (store_course_analysis.status_code % 3 === 0) {
//       const key1 = "notify-all-waitlist-changes";
//       const value1 = options[key1];
//       addKeyValuePair(key1, value1);
//     }
//   }, []);

//   // Define the motion variants for the sliding animation
//   const slideInVariants = {
//     initial: (direction) => ({
//       x: direction === "next" ? 1000 : -1000,
//       opacity: 0,
//     }),
//     animate: { x: 0, opacity: 1 },
//     exit: (direction) => ({
//       x: direction === "next" ? -1000 : 1000,
//       opacity: 0,
//     }),
//   };

//   return (
//       <div className="flex flex-col gap-8 h-full">
//         <section className="text-center w-full">
//           <h3 className="text-2xl font-bold underline mb-4">
//             {store_course_analysis.term_display}
//           </h3>
//           <h3 className="text-xl font-bold ">
//             {store_course_analysis.subject_class},{" "}
//             {store_course_analysis.section_title}
//           </h3>

//           {store_course_analysis.instructors.map((item, idx) => (
//             <p key={idx}>{item}</p>
//           ))}

//           <p className="font-medium text-green-500">
//             Class status: {store_course_analysis.status_text}
//           </p>
//           <p className="font-medium text-red-500">
//             Waitlist status: {store_course_analysis.waitlist_text}
//           </p>
//         </section>

        // <section className="bg-red-300 ">
        //   <CheckboxGroup
        //     label="Select when you want to be notified"
        //     value={selectedOptions}
        //     onValueChange={setSelectedOptions}
        //   >
        //     {Object.keys(optionsState).map((key) => (
        //       <Checkbox value={key} key={key} classNames={{ label: "text-sm" }}>
        //         {options[key]}
        //       </Checkbox>
        //     ))}
        //   </CheckboxGroup>
        // </section>

//         <div className="ml-auto my-6">
//             <StyledButton text="Previous" onPress={prevStep} classes="mr-6"/>
//             <StyledButton text="Next" onPress={nextStep}/>
//         </div>
//       </div>
//   );
// };