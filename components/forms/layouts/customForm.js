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

  let formFieldItems = {};

  useEffect(() => {
    if (dictItem !== null) {
      formFields.map((field) => {
        const isInDict = field.id in dictItem;
        if (isInDict) {
          console.log("TEST", dictItem[field.id]);
          console.log("TEST", field.id);
          const defaultValue = dictItem[field.id];
          const formField = formFields.filter(
            (item) => item.id === field.id
          )[0];
          formField["defaultValue"] = defaultValue;
          console.log("FORM FIELD", formField);
          //formFields[field]["defaultValue"] = dictItem[field.id];
        }
        //console.log("formFields", formFields);
      });
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [dictItem, formFieldItems, loaded]);

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
