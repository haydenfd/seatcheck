import "@/App.css";
import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { Loader } from "./components/ui/loader";
import { StyledButton } from "./components/ui/styled-button";
import { useLoadingContext } from "./context/loadingcontext";
import { useStepContext } from "./context/stepcontext";
import { resetCourseAnalysis } from "./store/course-analysis-slice";
import { resetFormData } from "./store/form-slice";

import { Form } from "@/components/form/form";
import { Guide } from "@/components/guide/guide";

function App() {
  const [loadForm, setLoadForm] = useState(false);
  const { isLoading } = useLoadingContext();
  const { resetStep } = useStepContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const dispatch = useDispatch();

  return (
    <div className="App min-h-screen overflow-auto">
      {isLoading && (
        <Loader
          text="Fetching course information"
          loading={isLoading}
          size={60}
        />
      )}
      <div className="mt-4 pt-2 mx-auto w-full text-center">
        <h1 className="text-4xl font-bold">Seatcheck @ UCLA</h1>
        <h2 className="text-2xl mt-2 underline font-medium">
          Get notified when a class space opens up
        </h2>
      </div>
      <Guide />
      <div className="w-full mx-auto text-center my-10">
        <StyledButton
          text={`${loadForm ? "End tracking" : "Set up course tracking"} `}
          onPress={() => {
            setLoadForm(prev => !prev);
            resetStep();
            dispatch(resetFormData());
            dispatch(resetCourseAnalysis());
          }}
          classes="mb-6"
        />
      </div>
      <Form isVisible={loadForm} setIsVisible={setLoadForm}/>
    </div>
  );
}

export default App;
