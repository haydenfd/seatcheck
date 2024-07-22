import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { FormProvider } from "./Context/FormContext";
import { Provider } from "react-redux";
import store from "./Store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <NextUIProvider>
      <FormProvider>
        <Router>
          <App />
        </Router>
      </FormProvider>
    </NextUIProvider>
  </Provider>,
);
