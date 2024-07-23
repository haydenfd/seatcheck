import { configureStore } from "@reduxjs/toolkit";
import formReducer from "@/store/form-slice";

export default configureStore({
  reducer: {
    form: formReducer,
  },
});