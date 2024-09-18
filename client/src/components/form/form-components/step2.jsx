import React, { useEffect, useState } from "react";

import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

import { StyledButton } from "@/components/ui/styled-button";
import { useStepContext } from "@/context/stepcontext";
import { setTrackingPreferences } from "@/store/form-slice";

const options = {
  "notify-all-seat-changes": "Notify me on all enrollment status changes (ex. Closed to Open, Open to Closed, Open to Waitlist)",
  "notify-all-waitlist-changes": "Notify me on all waitlist status changes (Full --> Open and Open --> Full)",
};

export const Step2 = () => {
  const dispatch = useDispatch();
  const store_course_analysis = useSelector((state) => state.courseAnalysis);
  const store_form = useSelector((state) => state.form);

  const [optionsState, setOptionsState] = useState({
    "notify-all-seat-changes": "Notify me on all enrollment status changes (ex. Closed to Open, Open to Closed, Open to Waitlist)",
  });
  const [selectedOptions, setSelectedOptions] = useState([]);

  const { nextStep, prevStep, direction } = useStepContext();

  const addKeyValuePair = (key, value) => {
    setOptionsState((prevState) => ({ ...prevState, [key]: value }));
  };

  useEffect(() => {
    if (store_form.tracking_preferences.length > 0) {
      setSelectedOptions(store_form.tracking_preferences);
    }

    const key2 = "notify-all-seat-changes";
    const value2 = options[key2];
    addKeyValuePair(key2, value2);

    if (store_course_analysis.status_code % 3 === 0) {
      const key1 = "notify-all-waitlist-changes";
      const value1 = options[key1];
      addKeyValuePair(key1, value1);
    }
  }, []);

  // Define the motion variants for the sliding animation
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
      <div className="flex flex-col gap-8 h-full">
        <section className="text-center w-full">
          <h3 className="text-2xl font-bold underline mb-4">
            {store_course_analysis.term_display}
          </h3>
          <h3 className="text-xl font-bold ">
            {store_course_analysis.subject_class},{" "}
            {store_course_analysis.section_title}
          </h3>

          {store_course_analysis.instructors.map((item, idx) => (
            <p key={idx}>{item}</p>
          ))}

          <p className="font-medium text-green-500">
            Class status: {store_course_analysis.status_text}
          </p>
          <p className="font-medium text-red-500">
            Waitlist status: {store_course_analysis.waitlist_text}
          </p>
        </section>

        <section className="bg-red-300 ">
          <CheckboxGroup
            label="Select when you want to be notified"
            value={selectedOptions}
            onValueChange={setSelectedOptions}
          >
            {Object.keys(optionsState).map((key) => (
              <Checkbox value={key} key={key} classNames={{ label: "text-sm" }}>
                {options[key]}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </section>

        <div className="ml-auto my-6">
            <StyledButton text="Prev" onPress={prevStep} classes="mr-6"/>
            <StyledButton text="Next" onPress={nextStep}/>
        </div>
      </div>
  );
};

{/*    <motion.div
      key="step2"
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideInVariants}
      transition={{ duration: 0.5 }}
    > */}