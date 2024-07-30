import { configureStore } from "@reduxjs/toolkit";
import formReducer from "@/store/form-slice";
import courseAnalysisReducer from "@/store/course-analysis-slice";

export default configureStore({
  reducer: {
    form: formReducer,
    courseAnalysis: courseAnalysisReducer,
  },
});
