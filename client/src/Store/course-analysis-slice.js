import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  term_display: "",
  subject_class: "",
  status_text: "",
  status_code: null,
  waitlist_text: "",
  instructors: [],
  final_date: "",
  is_offering_in_future: false,
  days: "",
  time: "",
  section_title: "",
};

export const courseAnalysisSlice = createSlice({
  name: "courseAnalysis",
  initialState: initialState,
  reducers: {
    setCourseAnalysisData: (state, action) => {
      // console.log(action.payload);
      return { ...state, ...action.payload };
    },
    resetCourseAnalysis: () => {
      return initialState;
    }

  },
});

export const { setCourseAnalysisData, resetCourseAnalysis } = courseAnalysisSlice.actions;

export default courseAnalysisSlice.reducer;
