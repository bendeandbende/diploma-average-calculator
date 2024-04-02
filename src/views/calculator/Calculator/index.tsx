import { useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import { addSubject } from "@/store/calculator/calculatorSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box } from "@mui/material";
import { SubjectForm } from "./SubjectForm";

export const Calculator = () => {
  const dispatch = useAppDispatch();
  const subjects = useAppSelector((state) => state.calculator.subjects);

  const handleAddSubject = useCallback(() => {
    dispatch(addSubject());
  }, [dispatch]);

  const lastSubject = subjects[subjects.length - 1];
  const isLastSubjectIncomplete =
    !lastSubject ||
    lastSubject.grade === undefined ||
    lastSubject.credit === undefined;

  const totalCredits = subjects.reduce((total, subject) => {
    if (subject.excludeFromCalculation) {
      return total;
    }

    return total + (subject.credit || 0);
  }, 0);

  const total = subjects.reduce((total, subject) => {
    if (subject.excludeFromCalculation) {
      return total;
    }
    return total + (subject.grade || 0) * (subject.credit || 0);
  }, 0);

  const average = totalCredits ? (total / totalCredits).toFixed(2) : "0";

  return (
    <Box className="p-5">
      {subjects.map((subject, index) => (
        <SubjectForm
          index={index}
          currentSubject={subject}
          key={`subject-${index}`}
        />
      ))}
      <button
        disabled={isLastSubjectIncomplete}
        onClick={handleAddSubject}
        className="flex gap-2 items-center p-2 bg-yellow-200 text-gray-800 rounded mb-5 shadow-lg hover:bg-yellow-300 font-bold"
      >
        <FaPlus />
        Add subject
      </button>
      <Box className="p-4 bg-green-100 rounded sticky bottom-0 z-50">
        <p className="font-bold">Diploma average: {average}</p>
      </Box>
    </Box>
  );
};
