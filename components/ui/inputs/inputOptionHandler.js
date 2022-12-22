import { SingleLineInput } from "./singleLine";
import { TextAreaInput } from "./textArea";
import { NumberInput } from "./number";
import { CurrencyInput } from "./currency";
import { ComboboxInput } from "./combobox";

export const InputOptionHandler = ({
  inputType,
  inputOptions,
  onSubmitAction,
}) => {
  const inputOption = () => {
    switch (inputType) {
      case "text" || "email" || "password":
        return (
          <SingleLineInput
            detailId={inputOptions.detailId}
            inputId={inputOptions.inputId}
            initialValue={inputOptions.initialValue}
            inputType={inputOptions.inputType}
            inputDisabled={inputOptions.inputDisabled}
            placeholder={inputOptions.placeholder}
            onSubmitAction={onSubmitAction}
          />
        );
      case "number":
        return (
          <NumberInput
            detailId={inputOptions.detailId}
            inputId={inputOptions.inputId}
            initialValue={inputOptions.initialValue}
            inputType={"number"}
            inputDisabled={inputOptions.inputDisabled}
            placeholder={inputOptions.placeholder}
            decimal={inputOptions.decimal ? inputOptions.decimal : 2}
            onSubmitAction={onSubmitAction}
          />
        );
      case "currency":
        return (
          <CurrencyInput
            detailId={inputOptions.detailId}
            inputId={inputOptions.inputId}
            initialValue={inputOptions.initialValue}
            inputType={"number"}
            inputDisabled={inputOptions.inputDisabled}
            decimal={inputOptions.decimal ? inputOptions.decimal : 2}
            onSubmitAction={onSubmitAction}
          />
        );
      case "textarea":
        return (
          <TextAreaInput
            detailId={inputOptions.detailId}
            inputId={inputOptions.inputId}
            initialValue={inputOptions.initialValue}
            inputDisabled={inputOptions.inputDisabled}
            placeholder={inputOptions.placeholder}
            onSubmitAction={onSubmitAction}
          />
        );
      /* case "combobox":
        return <ComboboxInput />; */
      default:
        return <SingleLineInput />;
    }
  };

  return <>{inputOption()}</>;
};
