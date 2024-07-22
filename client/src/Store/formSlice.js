import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    name: "",
    email: "",
    step: 0,
  },
  reducers: {
    mutatePersonalDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    incrementStep: (state) => {
      if (state.step < 1) {
        state.step += 1;
      }
    },
  },
});

export const { mutatePersonalDetails, incrementStep } = formSlice.actions;

export default formSlice.reducer;
