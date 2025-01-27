import { createSlice } from "@reduxjs/toolkit";

// const initialFormState = {
//   name: "",
//   email: "",
//   confirmation_email: "",
//   course_url: "",
//   tracking_preferences: [],
// };

// export const formSlice = createSlice({
//   name: "form",
//   initialState: initialFormState,
//   reducers: {
//     mutatePersonalDetails: (state, action) => {
//       state.name = action.payload.name;
//       state.email = action.payload.email;
//       state.confirmation_email = action.payload.confirmation_email;
//       console.log(state);
//     },
//     mutateCourseUrl: (state, action) => {
//       state.course_url = action.payload.course_url;
//     },
//     setTrackingPreferences: (state, action) => {
//       state.tracking_preferences = action.payload.selected_options;
//       console.log(`Preferences ${state.tracking_preferences}`);
//     },
//     resetFormData: () => {
//       return initialFormState;
//     }
//   },
// });

// export const {
//   mutatePersonalDetails,
//   mutateCourseUrl,
//   setTrackingPreferences,
//   resetFormData,
// } = formSlice.actions;

const initialStep3State = {
  name: "",
  email: "",
  confirmation_email: "",
};

const initialStep1State = {
  dept:"",
  term_cd:"",
  course_code:"",
  lecture: "",
}

const initialState = {
  step1: initialStep1State, 
  step2: {}, 
  step3: initialStep3State,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: { // Define reducers here
    updateStepData: (state, action) => {
      const { step, data } = action.payload;
      state[step] = { ...state[step], ...data }; 
      console.log("Updated state:", state[step]);
    },
    resetForm: () => initialState, 
  }
});

export const { updateStepData, resetForm } = formSlice.actions;
export default formSlice.reducer;
