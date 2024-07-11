import "./App.css";
import Guide from "./Components/Guide/Guide";
import { Route, Routes } from "react-router-dom";
import { FormProvider } from "./Context/FormContext";
import { Form } from "./Components/Form/Form";


function App() {
  return (
    <div className="App min-h-screen overflow-auto">
      {/* <Nav /> */}
      <div className="mt-8 pt-2 mx-auto w-full text-center">
        <h1 className="text-4xl">Seatcheck @ UCLA</h1>
        <h2 className="text-2xl mt-2 italic">
          Get notified when a class space opens up
        </h2>
      </div>
      <Guide />
      {/* <Routes>        
      <Route path="/guide"  element={<Guide/>} />
    </Routes> */}
      {/* <Guide /> */}
      {/* <CourseSelect /> */}
        <FormProvider>
          <Form />
        </FormProvider>
    </div>
  );
}

export default App;
