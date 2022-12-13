import { useState } from "react";
import { EditIcon } from "../buttons/editIcon";

export const DetailItem = ({
  detailId = "",
  fieldId = "",
  label,
  value,
  type = "text",
  showReorder,
  ReorderIcon,
  reorderAction,
  editable = true,
  editAction,
}) => {
  const [itemValue, setItemValue] = useState(value);
  const handleChange = (e) => {
    setItemValue(e.target.value);
    editAction({ nodeId: detailId, field: fieldId, value: e.target.value });
  };

  const handleSubmit = () => {
    editAction({ nodeId: detailId, body: { [fieldId]: itemValue } });
  };

  return (
    <div
      id="list-item-detail"
      className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2 sm:py-4 items-center"
    >
      <dt id="label" className="text-sm font-medium text-gray-500">
        {label}
      </dt>
      <dd className="flex text-sm text-gray-900 sm:col-span-2 items-center">
        <span className="flex-grow">
          <input
            id={fieldId}
            disabled={!editable}
            value={itemValue ? itemValue : ""}
            type={type}
            onChange={(e) => handleChange(e)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:bg-gray-50 focus:ring-orange-500 focus:border-orange-500 block w-full p-2"
          />
        </span>
        {showReorder ? (
          <span className="ml-4 flex-shrink-0">
            <button type="button" onClick={() => console.log(value)}>
              <ReorderIcon />
            </button>
          </span>
        ) : (
          ""
        )}
      </dd>
    </div>
  );
};
