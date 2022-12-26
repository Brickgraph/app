import { useState } from "react";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { Unstable_DateField as DateField } from "@mui/x-date-pickers/DateField";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const ReactDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  );
};

export const DatePickerInput = () => {
  const [selected, setSelected] = useState(new Date(2022, 0, 23));
  return (
    <>
      <MuiDatePicker label="Basic date picker" />
    </>
  );
};

export const DateFieldInput = ({ label }) => {
  const [selected, setSelected] = useState(new Date(2022, 0, 23));
  return (
    <>
      <DateField label={label} className="border border-orange-500 border-3" />
    </>
  );
};
