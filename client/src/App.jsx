import '@/App.css'
import React, { useState } from "react";
import { Guide } from '@/components/guide/guide';
import { Form } from '@/components/form/form';
function App() {

  return (
    <div className="App min-h-screen overflow-auto">
      <div className="mt-8 pt-2 mx-auto w-full text-center">
        <h1 className="text-4xl font-bold">Seatcheck @ UCLA</h1>
        <h2 className="text-2xl mt-2 underline font-medium">
          Get notified when a class space opens up
        </h2>
      </div>
      <Guide />
      <div className="w-full mx-auto text-center my-4">
      <Form />
      </div>
    </div>
  );
}

export default App;