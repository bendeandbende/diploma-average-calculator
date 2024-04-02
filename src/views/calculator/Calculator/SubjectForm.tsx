import { useState, useCallback, FC, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import { GRADES } from "@/constants";
import { Subject } from "@/types";
import {
  deleteSubject,
  updateSubject,
} from "@/store/calculator/calculatorSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { debounce } from "lodash";

interface SubjectFormProps {
  currentSubject: Subject;
  index: number;
}

export const SubjectForm: FC<SubjectFormProps> = ({
  currentSubject,
  index,
}) => {
  const dispatch = useAppDispatch();
  const [subject, setSubject] = useState(currentSubject);

  const handleDeleteSubject = useCallback(
    (index: number) => {
      dispatch(deleteSubject(index));
    },
    [dispatch]
  );

  const debouncedDispatch = useRef(
    debounce((subjectUpdate) => {
      dispatch(updateSubject({ index, subject: subjectUpdate }));
    }, 1000)
  ).current;

  const handleSubjectChange = (
    field: keyof Subject,
    value: string | number | boolean
  ) => {
    const subjectUpdate = { ...subject };

    if (field === "grade" || field === "credit") {
      subjectUpdate[field] = Number(value);
    } else if (field === "excludeFromCalculation") {
      subjectUpdate[field] = !!value;
    } else {
      subjectUpdate[field] = value as string;
    }

    setSubject(subjectUpdate);
    debouncedDispatch(subjectUpdate);
  };

  return (
    <Box
      className={`flex flex-col sm:flex-row gap-4 mb-5 p-6 pl-10 border rounded shadow-sm relative ${
        subject.excludeFromCalculation ? "bg-gray-100 opacity-50" : undefined
      }`}
      onSubmit={(e) => e.preventDefault()}
    >
      {index !== 0 && (
        <div className="absolute top-0 left-0 p-2 bg-yellow-100 rounded-br-lg text-black min-w-[32px] text-center font-bold text-xs">
          {index}
        </div>
      )}
      <TextField
        className="flex-1 p-2 border rounded"
        label="Subject name"
        value={subject.name}
        onChange={(e) => handleSubjectChange("name", e.target.value)}
      />
      <FormControl className="flex-1 p-2 border rounded">
        <InputLabel id="credit-label">Select credit</InputLabel>
        <Select
          labelId="credit-label"
          value={subject.credit || ""}
          onChange={(e) => handleSubjectChange("credit", e.target.value)}
          className={subject.credit ? "text-black" : "text-gray-400"}
          label="Select credit"
        >
          <MenuItem value="" disabled>
            Select credit
          </MenuItem>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((credit) => (
            <MenuItem key={credit} value={credit}>
              {credit}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ButtonGroup>
        {GRADES.map((grade) => (
          <Button
            key={grade}
            variant={subject.grade === grade ? "contained" : "outlined"}
            onClick={() => handleSubjectChange("grade", grade)}
          >
            {grade}
          </Button>
        ))}
      </ButtonGroup>

      <FormControlLabel
        control={
          <Checkbox
            checked={subject.excludeFromCalculation || false}
            onChange={(e) =>
              handleSubjectChange("excludeFromCalculation", e.target.checked)
            }
            color="primary"
          />
        }
        label="Exclude from calculation"
      />

      {index !== 0 && (
        <button
          type="button"
          onClick={() => handleDeleteSubject(index)}
          className="p-2 text-gray-800 rounded shadow-sm hover:bg-red-300 w-fit self-end"
        >
          <FaTrash color="darkred" />
        </button>
      )}
    </Box>
  );
};
