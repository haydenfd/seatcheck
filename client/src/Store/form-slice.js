import { createSlice } from "@reduxjs/toolkit";

const initialFormState = {
  name: "",
  email: "",
  confirmation_email: "",
  course_url: "",
  tracking_preferences: [],
};

export const formSlice = createSlice({
  name: "form",
  initialState: initialFormState,
  reducers: {
    mutatePersonalDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.confirmation_email = action.payload.confirmation_email;
      console.log(state);
    },
    mutateCourseUrl: (state, action) => {
      state.course_url = action.payload.course_url;
    },
    setTrackingPreferences: (state, action) => {
      state.tracking_preferences = action.payload.selected_options;
      console.log(`Preferences ${state.tracking_preferences}`);
    },
    resetFormData: () => {
      return initialFormState;
    }
  },
});

export const {
  mutatePersonalDetails,
  mutateCourseUrl,
  setTrackingPreferences,
  resetFormData,
} = formSlice.actions;

export default formSlice.reducer;
