import { FormBase } from "./formBase";
import { useState, useEffect } from "react";

export const CustomForm = ({
  dictItem,
  formFields,
  changeHandler,
  cancelAction,
  submitAction,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (dictItem !== null) {
      formFields.map((field) => {
        const isInDict = field.id in dictItem;
        if (isInDict) {
          const defaultValue = dictItem[field.id];
          const formField = formFields.filter(
            (item) => item.id === field.id
          )[0];
          formField["defaultValue"] = defaultValue;
        }
      });
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [dictItem, formFields, loaded]);

  return (
    <>
      <FormBase
        fields={formFields}
        changeHandler={changeHandler}
        cancelAction={cancelAction}
        submitAction={submitAction}
      />
    </>
  );
};
