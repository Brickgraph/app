import { useState, useEffect } from "react";
import { convertDateToCalendarFormat } from "../../../services/time/convertDates";

export const DateInput = ({
  detailId,
  inputId,
  initialValue,
  inputDisabled = false,
  region = "en-GB",
  onSubmitAction,
}) => {
  // Field for date input with validation for day, month, year
  const [newValue, setNewValue] = useState("");
  const [changeSubmitted, setChangeSubmitted] = useState(true);

  useEffect(() => {
    if (!initialValue) {
      const currentMonthDay = ("0" + new Date().getDate()).slice(-2);
      const currentMonth = ("0" + (new Date().getMonth() + 1)).slice(-2);
      const currentYear = new Date().getFullYear();
      const date = new Date(currentYear, currentMonth, currentMonthDay);
      setNewValue(convertDateToCalendarFormat(date));
    } else {
      const date = new Date(
        initialValue.slice(0, 4),
        initialValue.slice(5, 7),
        initialValue.slice(8, 10)
      );
      setNewValue(convertDateToCalendarFormat(date));
    }
  }, []);

  const handleChange = (e) => {
    setNewValue(e.target.value);
    setChangeSubmitted(false);
  };

  const handleSubmit = () => {
    if (!changeSubmitted) {
      onSubmitAction({ refId: detailId, body: { [inputId]: newValue } });
      setChangeSubmitted(true);
    }
  };

  return (
    <div className="relative">
      <input
        id={inputId}
        disabled={inputDisabled}
        type="date"
        value={newValue}
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:bg-gray-50 focus:ring-orange-500 focus:border-orange-500 block w-full p-2"
        onChange={(e) => handleChange(e)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <div className="absolute inset-y-0 right-6 flex items-center pr-2">
        <button onClick={() => handleSubmit()} disabled={changeSubmitted}>
          <kbd className="inline-flex items-center rounded border-gray-200 px-2 font-sans text-sm font-medium text-gray-500 hover:text-gray-800">
            {changeSubmitted ? "" : "Update"}
          </kbd>
        </button>
      </div>
    </div>
  );
};
