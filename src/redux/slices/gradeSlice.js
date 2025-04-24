import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  levels: {
    "Year 1": {
      "First Semester": {
        courses: [
          { code: "FSH 211", grade: "A", point: "5" },
          { code: "AST 211", grade: "B", point: "4" },
          { code: "CSH 211", grade: "C", point: "3" },
        ],
      },
      "Second Semester": {
        courses: [],
      },
    },
    "Year 2": {
      "First Semester": {
        courses: [],
      },
      "Second Semester": {
        courses: [],
      },
    },
    "Year 3": {
      "First Semester": {
        courses: [],
      },
      "Second Semester": {
        courses: [],
      },
    },
    "Year 4": {
      "First Semester": {
        courses: [],
      },
      "Second Semester": {
        courses: [],
      },
    },
  },
};

export const gradeSlice = createSlice({
  name: "grades",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      const { year, semester, course } = action.payload;
      state.levels[year][semester].courses.push(course);
    },
    updateCourse: (state, action) => {
      const { year, semester, courseIndex, update } = action.payload;
      state.levels[year][semester].courses[courseIndex] = {
        ...state.levels[year][semester].courses[courseIndex],
        ...update,
      };
    },
  },
});

export const { addCourse, updateCourse } = gradeSlice.actions;
export default gradeSlice.reducer;
