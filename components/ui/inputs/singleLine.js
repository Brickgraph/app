import { useState, useEffect } from "react";

export const SingleLineInput = ({
  detailId,
  inputId,
  initialValue,
  inputType = "password",
  inputDisabled = false,
  placeholder = "",
  onSubmitAction,
}) => {
  const [baseValue, setBaseValue] = useState(initialValue);
  const [newValue, setNewValue] = useState(baseValue);
  const [submitChange, setSubmitChange] = useState(false);

  const handleChange = (e) => {
    setNewValue(e.target.value);
    if (baseValue !== e.target.value) {
      setSubmitChange(true);
    }
    if (baseValue === e.target.value) {
      setSubmitChange(false);
    }
  };

  const handleSubmit = () => {
    if (submitChange) {
      onSubmitAction({ refId: detailId, body: { [inputId]: newValue } });
      setBaseValue(newValue);
      setSubmitChange(false);
    }
  };

  return (
    <div className="relative">
      <input
        id={inputId}
        disabled={inputDisabled}
        value={newValue ? newValue : ""}
        type={inputType}
        placeholder={placeholder}
        step="0.01"
        onChange={(e) => handleChange(e)}
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:bg-gray-50 focus:ring-orange-500 focus:border-orange-500 block w-full p-2"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <div className="absolute inset-y-0 right-6 flex items-center pr-2">
        <button onClick={() => handleSubmit()} disabled={!submitChange}>
          <kbd className="inline-flex items-center rounded border-gray-200 px-2 font-sans text-sm font-medium text-gray-500 hover:text-gray-800">
            {submitChange ? "Update" : ""}
          </kbd>
        </button>
      </div>
    </div>
  );
};
