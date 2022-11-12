import { DefaultInput } from "../inputs/utils/Input";
import { useState, useEffect } from "react";

export const FormBase = ({
  fields,
  changeHandler,
  cancelAction,
  submitAction,
}) => {
  const [fieldData, setFieldData] = useState(false);
  useEffect(() => {
    setFieldData(fields);
  }, [fields]);

  return (
    <>
      <form onSubmit={submitAction}>
        <div>
          <ul>
            {fieldData
              ? fieldData.map((field) => {
                  //console.log("FORM fieldS", field);
                  return (
                    <>
                      <div className="py-2 px-6">
                        <li key={field.id}>
                          <DefaultInput
                            name={field.label}
                            type={field.type}
                            defaultValue={
                              field.defaultValue ? field.defaultValue : null
                            }
                            labelText={field.label}
                            labelFor={field.label}
                            id={field.id}
                            isRequired={field.required}
                            onChangeHandler={changeHandler}
                            disable={field.disable}
                          />
                        </li>
                      </div>
                    </>
                  );
                })
              : ""}
          </ul>
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              onClick={cancelAction}
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
