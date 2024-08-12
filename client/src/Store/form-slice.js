import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    name: "",
    email: "",
    course_url: "",
    tracking_preferences: [],
  },
  reducers: {
    mutatePersonalDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      // console.log(state.name, state.email);
    },
    mutateCourseUrl: (state, action) => {
      state.course_url = action.payload.course_url;
      // console.log(`Saved ${state.course_url}`);
    },
    setTrackingPreferences: (state, action) => {
      state.tracking_preferences = action.payload.selected_options;
      // console.log(`Preferences ${state.tracking_preferences}`);
    },
  },
});

export const {
  mutatePersonalDetails,
  mutateCourseUrl,
  setTrackingPreferences,
} = formSlice.actions;

export default formSlice.reducer;
