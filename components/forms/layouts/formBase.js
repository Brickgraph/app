import { DefaultInput } from "../inputs/utils/Input";
import { useState, useEffect } from "react";

export const FormBase = ({
  dictItem,
  changeHandler,
  cancelAction,
  submitAction,
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    setDataLoaded(dictItem);
  }, [dictItem]);

  return (
    <>
      <form onSubmit={submitAction}>
        <div>
          <ul>
            {dataLoaded
              ? Object.keys(dataLoaded).map((key) => {
                  return (
                    <>
                      <div className="py-2 px-6">
                        <li key={key}>
                          <DefaultInput
                            name={key}
                            type="text"
                            defaultValue={dataLoaded[key]}
                            labelText={key}
                            labelFor={key}
                            id={key}
                            isRequired={false}
                            onChangeHandler={changeHandler}
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
