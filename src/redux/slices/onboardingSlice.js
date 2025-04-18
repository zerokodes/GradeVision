import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
  completed: false,
  userData: {
    firstName: "",
    lastName: "",
    school: "",
    course: "",
    username: "",
    email: "",
    password: "",
  },
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },
    completeOnboarding: (state) => {
      state.completed = true;
    },
    resetOnboarding: (state) => {
      return initialState;
    },
  },
});

export const {
  nextStep,
  prevStep,
  setStep,
  updateUserData,
  completeOnboarding,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
