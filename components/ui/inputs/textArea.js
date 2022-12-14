import { useState } from "react";

export const TextAreaInput = ({
  detailId,
  inputId,
  initialValue,
  inputDisabled = false,
  placeholder = "",
  onSubmitAction,
}) => {
  const [baseValue, setBaseValue] = useState(initialValue);
  const [newValue, setNewValue] = useState(baseValue);
  const [changeSubmitted, setChangeSubmitted] = useState(true);

  const handleChange = (e) => {
    setNewValue(e.target.value);
    if (baseValue !== e.target.value) {
      setChangeSubmitted(false);
    }
    if (baseValue === e.target.value) {
      setChangeSubmitted(true);
    }
  };

  const handleSubmit = () => {
    if (!changeSubmitted) {
      onSubmitAction({ refId: detailId, body: { [inputId]: newValue } });
      setBaseValue(newValue);
      setChangeSubmitted(true);
    }
  };

  return (
    <div className="relative">
      <textarea
        id={inputId}
        rows={2}
        name={`textarea-${inputId}`}
        type={"text"}
        placeholder={placeholder}
        value={newValue ? newValue : ""}
        disabled={inputDisabled}
        onChange={(e) => handleChange(e)}
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:bg-gray-50 focus:ring-orange-500 focus:border-orange-500 block w-full p-2"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <div className="absolute top-2 right-6 flex items-center pr-2">
        <button onClick={() => handleSubmit()} disabled={changeSubmitted}>
          <kbd className="inline-flex items-center rounded border-gray-200 px-2 font-sans text-sm font-medium text-gray-500 hover:text-gray-800">
            {changeSubmitted ? "" : "Update"}
          </kbd>
        </button>
      </div>
    </div>
  );
};
