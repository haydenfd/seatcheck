import React from "react";

import { NextUIProvider } from "@nextui-org/react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { NotFound } from "./components/notfound/notfound";
import { Tracking } from "./components/tracking/tracking";
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
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/track/:track_id" element={<Tracking />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </LoadProvider>
      </StepProvider>
    </NextUIProvider>
  </Provider>,
);
