import "@/App.css";
import React, { useState } from "react";
import { Fragment } from "react";

import { useDispatch } from "react-redux";

import { MultiStepForm } from "./components/multistepform/MultiStepForm";
import { CustomButton } from "./components/ui/CustomButton";
import { Header } from "./components/ui/header";
import { Loader } from "./components/ui/loader";
import { StyledButton } from "./components/ui/styled-button";
import { useLoadingContext } from "./context/loadingcontext";
import { useStepContext } from "./context/stepcontext";

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
    <Fragment>
      {isLoading && (
        <Loader
          text="Fetching course information"
          loading={isLoading}
          size={60}
        />
      )}
      <Header />
      {/* <div className="mt-4 pt-2 mx-auto w-full text-center">
        <h1 className="text-4xl font-extrabold font-open uppercase leading-relaxed">Seatcheck @ UCLA</h1>
        <h2 className="text-2xl underline font-semibold font-open ">
          Get notified when a class space opens
        </h2>
      </div> */}
      <Guide />
      <div className="w-full mx-auto text-center my-10">
        {
          !loadForm && (
            <CustomButton
            displayText="Get started now!"
            customClasses="px-8 py-6 text-md"
            onButtonPress={() => {
              setLoadForm(prev => !prev);
              resetStep();
            }}
            
          />
          )
        }

      </div>
      {loadForm && (
  <MultiStepForm onClose={() => setLoadForm(false)} />
)}
    </Fragment>
  );
}

export default App;
