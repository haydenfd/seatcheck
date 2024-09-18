import React from "react";

import { NextUIProvider } from "@nextui-org/react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { LoadProvider } from "./context/loadingcontext";

import App from "@/App";
import { StepProvider } from "@/context/stepcontext";
import store from "@/store/store";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <NextUIProvider>
      <StepProvider>
        <LoadProvider>
          <Router>
            <App />
          </Router>
        </LoadProvider>
      </StepProvider>
    </NextUIProvider>
  </Provider>,
);
