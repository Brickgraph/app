import { useState } from "react";

export const FileInput = ({
  detailId,
  inputId,
  initialValue,
  inputDisabled = false,
  onSubmitAction,
}) => {
  const [baseValue, setBaseValue] = useState(initialValue);
  const [newValue, setNewValue] = useState(baseValue);
  const [changeSubmitted, setChangeSubmitted] = useState(true);

  const handleChange = (e) => {
    setNewValue(e.target.files[0]);
    if (baseValue !== e.target.files[0]) {
      setChangeSubmitted(false);
    }
    if (baseValue === e.target.files[0]) {
      setChangeSubmitted(true);
    }
  };

  const handleSubmit = () => {
    if (!changeSubmitted) {
      //onSubmitAction({ refId: detailId, body: { [inputId]: newValue } });
      console.log(newValue);
      setBaseValue(newValue);
      setChangeSubmitted(true);
    }
  };

  return (
    <div className="relative">
      <span className="sr-only">Choose File</span>
      <input
        id={inputId}
        disabled={inputDisabled}
        type="file"
        onChange={(e) => handleChange(e)}
        className="bg-white border border-gray-300 text-gray-900 rounded-md focus:bg-gray-50 focus:ring-orange-500 focus:border-orange-500 block w-full
        file:rounded-md file:text-xs"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <div className="absolute inset-y-0 right-1 flex items-center">
        <button onClick={() => handleSubmit()} disabled={changeSubmitted}>
          <kbd className="inline-flex items-center rounded border-gray-200 px-2 font-sans text-xs font-medium text-gray-500 hover:text-gray-800">
            {changeSubmitted ? "" : "Update"}
          </kbd>
        </button>
      </div>
    </div>
  );
};
