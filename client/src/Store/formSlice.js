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

  },
});

export const { mutatePersonalDetails } = formSlice.actions;

export default formSlice.reducer;