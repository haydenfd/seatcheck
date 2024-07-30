import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router } from "react-router-dom";
import { StepProvider } from "@/context/stepcontext";
import { LoadProvider } from "./context/loadingcontext";
import store from "@/store/store";
import App from "@/App";
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
