import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Subject } from "@/types";

interface CalculatorState {
  subjects: Subject[];
}

const initialState: CalculatorState = {
  subjects: [
    { name: "Complex final exam (thesis + state exam)", grade: 5, credit: 20 },
    { name: "", grade: undefined, credit: "" },
  ],
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setSubjects: (state, action: PayloadAction<Subject[]>) => {
      state.subjects = action.payload;
    },
    addSubject: (state) => {
      state.subjects.push({ name: "", grade: undefined, credit: "" });
    },
    updateSubject: (
      state,
      action: PayloadAction<{
        index: number;
        subject: Subject;
      }>
    ) => {
      const { index, subject } = action.payload;

      state.subjects[index] = subject;
    },
    deleteSubject: (state, action: PayloadAction<number>) => {
      state.subjects.splice(action.payload, 1);
    },
  },
});

export const { setSubjects, addSubject, updateSubject, deleteSubject } =
  calculatorSlice.actions;

export default calculatorSlice.reducer;
