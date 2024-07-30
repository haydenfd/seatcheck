import React, { useEffect, useState } from "react";
import { StyledButton } from "@/components/ui/styled-button";
import { useStepContext } from "@/context/stepcontext";
import { useSelector, useDispatch } from "react-redux";
import { TrackingCheckboxes } from "@/components/ui/tracking-checkboxes";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { setTrackingPreferences } from "@/store/form-slice";

const options = {
  "notify-seat-open": "Notify me when a seat opens up in the class",
  "notify-waitlist-spot-open": "Notify me when a waitlist spot opens up",
  "notify-less-than-three-seats-left":
    "Notify me when the class hits 90% enrollment",
  "notify-less-than-three-waitlist-spots-left":
    "Notify me when the waitlist reaches only has 3 spots left",
};

export const Step2 = () => {
  const dispatch = useDispatch();

  const store_course_analysis = useSelector((state) => state.courseAnalysis);
  const store_form = useSelector((state) => state.form);

  const [optionsState, setOptionsState] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);

  const addKeyValuePair = (key, value) => {
    setOptionsState((prevState) => ({ ...prevState, [key]: value }));
  };

  const { nextStep, prevStep } = useStepContext();

  useEffect(() => {
    if (store_form.tracking_preferences.length > 0) {
      setSelectedOptions(store_form.tracking_preferences);
    }

    if (store_course_analysis.status_code === 10) {
      const key = "notify-less-than-three-seats-left";
      const value = options[key];
      addKeyValuePair(key, value);
    }

    if (
      store_course_analysis.status_code === 0 ||
      store_course_analysis.status_code === 1
    ) {
      const key = "notify-seat-open";
      const value = options[key];
      addKeyValuePair(key, value);
    }

    if (store_course_analysis.waitlist_code === 0) {
      const key = "notify-waitlist-spot-open";
      const value = options[key];
      addKeyValuePair(key, value);
    }

    if (store_course_analysis.waitlist_code === 2) {
      const key = "notify-less-than-three-waitlist-spots-left";
      const value = options[key];
      addKeyValuePair(key, value);
    }
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full">
      <section className="text-center w-full">
        <h3 className="font-medium">
          {store_course_analysis.subject_class},{" "}
          {store_course_analysis.section_title}
        </h3>
        <p className="font-medium italic">
          {store_course_analysis.instructors[0]} (
          {store_course_analysis.term_display})
        </p>
        <p className="font-medium text-green-500">
          {store_course_analysis.status_text}
        </p>
        <p className="font-medium text-red-500">
          {store_course_analysis.waitlist_text}
        </p>
      </section>

      <section className="bg-red-300 ">
        <CheckboxGroup
          label="Select when you want to be notified"
          value={selectedOptions}
          onValueChange={setSelectedOptions}
        >
          {Object.keys(optionsState).map((key) => (
            <Checkbox value={key} key={key}>
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
