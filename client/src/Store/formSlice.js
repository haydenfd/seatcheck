import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    name: "",
    email: "",
    course_url: "",
  },
  reducers: {
    mutatePersonalDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    mutateCourseUrl: (state, action) => {
      state.course_url = action.payload.course_url;
      console.log(`Saved ${state.course_url}`)
    },
  },
});

export const { mutatePersonalDetails, mutateCourseUrl } = formSlice.actions;

export default formSlice.reducer;
