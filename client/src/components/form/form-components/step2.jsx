import React, { useEffect, useState } from "react";
import { StyledButton } from "@/components/ui/styled-button";
import { useStepContext } from "@/context/stepcontext";
import { useSelector, useDispatch } from "react-redux";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { setTrackingPreferences } from "@/store/form-slice";

const options = {

    // "notify-seat-open": "Notify me when a seat opens up (Closed to Open OR Closed to Waitlist)",
    "notify-all-seat-changes": "Notify me on all enrollment status changes (ex. Closed to Open, Open to Closed, Open to Waitlist)",
    // "notify-waitlist-open": "Notify me when waitlist spot opens up (eg. Waitlist Full --> Waitlist Open)",
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

  const addKeyValuePair = (key, value) => {
    setOptionsState((prevState) => ({ ...prevState, [key]: value }));
  };

  const { nextStep, prevStep } = useStepContext();

  useEffect(() => {
    if (store_form.tracking_preferences.length > 0) {
      setSelectedOptions(store_form.tracking_preferences);
    }

    // notify only when enrollment status changes from closed to open
    // notify for all changes (closed -> open, open -> closed)
    // notify only when waitlist spot opens up (full -> open)
    // notify for all status changes on the waitlist (open -> full, full -> open)


    const key2 = "notify-all-seat-changes";
    const value2 = options[key2];
    addKeyValuePair(key2, value2);  

    if (store_course_analysis.status_code % 3 === 0) {
      const key1 = "notify-all-waitlist-changes";
      const value1 = options[key1];
      addKeyValuePair(key1, value1);
    }

  }, []);

  return (
    <div className="flex flex-col gap-8 w-full ">
      <section className="text-center w-full">
        <h3 className="text-2xl font-bold underline mb-4">
          {store_course_analysis.term_display}
        </h3>
        <h3 className="text-xl font-bold ">
          {store_course_analysis.subject_class},{" "}
          {store_course_analysis.section_title}
        </h3>

          {store_course_analysis.instructors.map((item, idx) => (
            <p key={idx}>
              {item}
            </p>
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
            <Checkbox value={key} key={key} classNames={
              {
                label: "text-sm"
              }
            }>
              {options[key]}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </section>
      <div>
        <StyledButton
          onPress={prevStep}
          isButtonDisabled={false}
          text="Previous"
          classes="w-1/2 flex-1"
        />
        <StyledButton
          onPress={() => {
            dispatch(
              setTrackingPreferences({
                selected_options: selectedOptions,
              }),
            );
            nextStep();
          }}
          isButtonDisabled={selectedOptions.length === 0}
          text="Next"
          classes="w-1/2 flex-1"
        />
      </div>
    </div>
  );
};
