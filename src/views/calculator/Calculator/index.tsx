import { useState, ChangeEvent } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { GRADES } from "@/constants";
import { Subject } from "@/types";
import {
  addSubject,
  deleteSubject,
  updateSubject,
} from "@/store/calculator/calculatorSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export const Calculator = () => {
  const dispatch = useAppDispatch();
  const subjects = useAppSelector((state) => state.calculator.subjects);

  const handleAddSubject = () => {
    dispatch(addSubject());
  };

  const handleChange = (index: number, field: keyof Subject, value: string) => {
    dispatch(updateSubject({ index, field, value }));
  };

  const handleDeleteSubject = (index: number) => {
    dispatch(deleteSubject(index));
  };

  const lastSubject = subjects[subjects.length - 1];
  const isLastSubjectIncomplete =
    !lastSubject ||
    lastSubject.grade === undefined ||
    lastSubject.credit === undefined;

  const totalCredits = subjects.reduce(
    (total, subject) => total + (subject.credit || 0),
    0
  );
  const total = subjects.reduce(
    (total, subject) => total + (subject.grade || 0) * (subject.credit || 0),
    0
  );
  const average = totalCredits ? (total / totalCredits).toFixed(2) : "0";

  return (
    <div className="p-5">
      {subjects.map((subject, index) => (
        <form
          key={index}
          className="flex flex-col sm:flex-row gap-4 mb-5 p-6 pl-10 border rounded shadow-sm relative"
          onSubmit={(e) => e.preventDefault()}
        >
          {index !== 0 && (
            <div className="absolute top-0 left-0 p-2 bg-yellow-100 rounded-br-lg text-black min-w-[32px] text-center font-bold text-xs">
              {index}
            </div>
          )}
          <input
            className="flex-1 p-2 border rounded"
            value={subject.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(index, "name", e.target.value)
            }
            placeholder="Subject name"
            required
          />
          <select
            className={`flex-1 p-2 border rounded ${
              subject.credit ? "text-black" : "text-gray-400"
            }`}
            value={subject.credit || ""}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleChange(index, "credit", e.target.value)
            }
            required
          >
            <option value="" disabled>
              Select credit
            </option>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((credit) => (
              <option key={credit} value={credit}>
                {credit}
              </option>
            ))}
          </select>
          <div className="flex space-x-2">
            {GRADES.map((grade) => (
              <button
                key={grade}
                className={`p-2 border rounded w-10 h-10 ${
                  subject.grade === grade ? "bg-yellow-200" : undefined
                }`}
                onClick={() => handleChange(index, "grade", grade?.toString())}
              >
                {grade}
              </button>
            ))}
          </div>
          {index !== 0 && (
            <button
              type="button"
              onClick={() => handleDeleteSubject(index)}
              className="p-2 text-gray-800 rounded shadow-sm hover:bg-red-300 w-fit self-end"
            >
              <FaTrash color="darkred" />
            </button>
          )}
        </form>
      ))}
      <button
        disabled={isLastSubjectIncomplete}
        onClick={handleAddSubject}
        className="flex gap-2 items-center p-2 bg-yellow-200 text-gray-800 rounded mb-5 shadow-lg hover:bg-yellow-300 font-bold"
      >
        <FaPlus />
        Add subject
      </button>
      <div className="p-4 bg-green-100 rounded sticky bottom-0">
        <p className="font-bold">Diploma average: {average}</p>
      </div>
    </div>
  );
};
