import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import onboardingReducer from "./slices/onboardingSlice";
import gradeReducer from "./slices/gradeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onboarding: onboardingReducer,
    grades: gradeReducer,
  },
});
