
import '@/App.css'
import { Guide } from "@/Components/Guide/Guide";
import { Form } from "@/Components/Form/Form";
import React, { useState } from "react";
import { StyledButton, Loader } from "@/Components/UIComponents";

function App() {
  return (
    <div className="App min-h-screen overflow-auto">
      <Loader text="hello" loading={false} size={60} />
      <div className="mt-8 pt-2 mx-auto w-full text-center">
        <h1 className="text-4xl font-bold">Seatcheck @ UCLA</h1>
        <h2 className="text-2xl mt-2 underline font-medium">
          Get notified when a class space opens up
        </h2>
      </div>
      <Guide />
      <div className="w-full mx-auto text-center my-4">
        {/* <StyledButton
          text={`${promptFormStartState ? "Get started now" : "End tracking"} `}
          onPress={toggleFormStartState}
        /> */}
      </div>
      <Form isVisible={true} />
    </div>
  );
}

export default App;
