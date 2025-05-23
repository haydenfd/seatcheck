import React from "react";

import { HeroUIProvider } from "@heroui/react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { NotFound } from "./components/notfound/notfound";
import { LoadProvider } from "./context/loadingcontext";

import App from "@/App";
import { StepProvider } from "@/context/stepcontext";
import store from "@/store/store";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HeroUIProvider>
      <StepProvider>
        <LoadProvider>
        <Router>
            <Routes>
              <Route path="/" element={<App />} />
              {/* <Route path="/track/:track_id" element={<Tracking />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </LoadProvider>
      </StepProvider>
    </HeroUIProvider>
  </Provider>,
);
