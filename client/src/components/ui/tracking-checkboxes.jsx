import React, { useEffect, useState } from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";

const options = {
  "notify-seat-open": "Notify me when a seat opens up in the class",
  "notify-waitlist-spot-open": "Notify me when a waitlist spot opens up",
  "notify-less-than-three-seats-left":
    "Notify me when the class hits 90% enrollment",
  "notify-less-than-three-waitlist-spots-left":
    "Notify me when the waitlist reaches only has 3 spots left",
};

export const TrackingCheckboxes = ({ course_analysis }) => {
  const [optionsState, setOptionsState] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);

  const addKeyValuePair = (key, value) => {
    setOptionsState((prevState) => ({ ...prevState, [key]: value }));
  };

  useEffect(() => {
    if (course_analysis.status_code === 10) {
      const key = "notify-less-than-three-seats-left";
      const value = options[key];
      addKeyValuePair(key, value);
    }

    if (
      course_analysis.status_code === 0 ||
      course_analysis.status_code === 1
    ) {
      const key = "notify-seat-open";
      const value = options[key];
      addKeyValuePair(key, value);
    }

    if (course_analysis.waitlist_code === 0) {
      const key = "notify-waitlist-spot-open";
      const value = options[key];
      addKeyValuePair(key, value);
    }

    if (course_analysis.waitlist_code === 2) {
      const key = "notify-less-than-three-waitlist-spots-left";
      const value = options[key];
      addKeyValuePair(key, value);
    }
  }, []);

  return (
    <>
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
    </>
  );
};
