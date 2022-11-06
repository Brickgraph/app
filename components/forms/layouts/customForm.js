import { FormBase } from "./formBase";
import { useState, useEffect } from "react";

export const CustomForm = ({
  dictItem,
  formKeys,
  changeHandler,
  cancelAction,
  submitAction,
}) => {
  const [loaded, setLoaded] = useState(false);

  let formItem = {};

  useEffect(() => {
    if (dictItem !== null) {
      formKeys.forEach((key) => {
        formItem[key] = dictItem[key];
      });
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [dictItem, formItem, loaded]);

  if (loaded === true) {
    return (
      <>
        <FormBase
          dictItem={formItem}
          changeHandler={changeHandler}
          cancelAction={cancelAction}
          submitAction={submitAction}
        />
      </>
    );
  }
  return (
    <>
      <div>Loading...</div>
    </>
  );
};
