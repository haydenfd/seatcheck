import "./App.css";
import {Guide} from "./Components/Guide/Guide";
import { FormProvider } from "./Context/FormContext";
import { Form } from "./Components/Form/Form";
import { StyledButton } from "./Components/StyledButton/StyledButton";
import React, { useState } from "react";

function App() {

  const [promptFormStartState, setPromptFormStartState] = useState(true)

  const toggleFormStartState = () => {
    setPromptFormStartState(!promptFormStartState);
  }

  return (
    <div className="App min-h-screen overflow-auto">
      <div className="mt-8 pt-2 mx-auto w-full text-center">
        <h1 className="text-4xl font-bold">Seatcheck @ UCLA</h1>
        <h2 className="text-2xl mt-2 underline font-medium">
          Get notified when a class space opens up
        </h2>
      </div>
      <Guide />
      <FormProvider>
      <div className="w-full mx-auto text-center my-4">
        <StyledButton text={`${promptFormStartState? "Get started now" : "End tracking"} `} onPress={() => toggleFormStartState()}/>
      </div>
          <Form isVisible={!promptFormStartState}/>
        </FormProvider>
    </div>
  );
}

export default App;
