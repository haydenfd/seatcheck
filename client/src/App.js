import "./App.css";
import { Guide } from "./Components/Guide/Guide";
import { useFormContext } from "./Context/FormContext";
import { Form } from "./Components/Form/Form";
import React, { useState } from "react";
import { StyledButton, Loader } from "./Components/UIComponents";

// const override = {
//   display: "block",
//   margin: "0 auto",
// };

function App() {
  const { hardResetAllFormData, isLoading, loadingText } = useFormContext();

  const [promptFormStartState, setPromptFormStartState] = useState(true);

  const toggleFormStartState = () => {
    if (!promptFormStartState) {
      hardResetAllFormData();
    }
    setPromptFormStartState(!promptFormStartState);
  };

  return (
    <div className="App min-h-screen overflow-auto">
      <Loader text={loadingText} loading={isLoading} size={60} />
      <div className="mt-8 pt-2 mx-auto w-full text-center">
        <h1 className="text-4xl font-bold">Seatcheck @ UCLA</h1>
        <h2 className="text-2xl mt-2 underline font-medium">
          Get notified when a class space opens up
        </h2>
      </div>
      <Guide />
      <div className="w-full mx-auto text-center my-4">
        <StyledButton
          text={`${promptFormStartState ? "Get started now" : "End tracking"} `}
          onPress={toggleFormStartState}
        />
      </div>
      <Form isVisible={!promptFormStartState} />
    </div>
  );
}

export default App;
