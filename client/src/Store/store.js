import { configureStore } from "@reduxjs/toolkit";

import courseAnalysisReducer from "@/store/course-analysis-slice";
import formReducer from "@/store/form-slice";

export default configureStore({
  reducer: {
    form: formReducer,
    courseAnalysis: courseAnalysisReducer,
  },
});
