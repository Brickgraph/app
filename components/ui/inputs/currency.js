import { useState, useEffect } from "react";

export const CurrencyInput = ({
  detailId,
  inputId,
  initialValue,
  inputDisabled = false,
  placeholder = 0,
  currency = "GBP",
  decimalPlaces = 0,
  onSubmitAction,
}) => {
  const [baseValue, setBaseValue] = useState(+initialValue);
  const [newValue, setNewValue] = useState(+baseValue);
  const [changeSubmitted, setChangeSubmitted] = useState(true);

  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    AUD: "A$",
    CAD: "C$",
    CHF: "Fr.",
    CNY: "¥",
    DKK: "kr.",
    HKD: "HK$",
    INR: "₹",
    JPY: "¥",
    KRW: "₩",
    MXN: "Mex$",
    NOK: "kr",
    NZD: "NZ$",
  };

  const body = {
    [inputId]: newValue,
    [inputId + "_currency"]: currency,
  };

  const handleChange = (e) => {
    setNewValue(+e.target.value);
    if (baseValue !== e.target.value) {
      setChangeSubmitted(false);
    }
    if (baseValue === e.target.value) {
      setChangeSubmitted(true);
    }
  };

  const handleSubmit = () => {
    if (!changeSubmitted) {
      onSubmitAction({ refId: detailId, body: body });
      setBaseValue(+newValue);
      setChangeSubmitted(true);
    }
  };

  useEffect(() => {
    setNewValue(initialValue);
  }, [initialValue]);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
        <span className="text-gray-700 sm:text-sm">
          {currencySymbols[currency]}
        </span>
      </div>
      <input
        id={inputId}
        disabled={inputDisabled}
        value={newValue ? newValue : ""}
        type={"number"}
        step="0.01"
        onChange={(e) => handleChange(e)}
        placeholder={
          placeholder ? placeholder : Number(baseValue.toFixed(decimalPlaces))
        }
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:bg-gray-50 focus:ring-orange-500 focus:border-orange-500 block w-full pl-5 pr-2 py-2"
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
