import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cgpaGoal: 4.5,
};

export const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    setCGPAGoal: (state, action) => {
      state.cgpaGoal = action.payload;
    },
  },
});

export const { setCGPAGoal } = goalSlice.actions;
export default goalSlice.reducer;

// STEP guide: Sorry, Thanks, Excuse, Please..
