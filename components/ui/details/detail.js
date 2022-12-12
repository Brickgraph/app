import { useState } from "react";
import { EditIcon } from "../buttons/editIcon";

export const DetailItem = ({
  detailId = "",
  fieldId = "",
  label,
  value,
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
      className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:p-4"
    >
      <dt id="label" className="text-sm font-medium text-gray-500">
        {label}
      </dt>
      <dd className="flex text-sm text-gray-900 sm:col-span-2">
        <span className="flex-grow">
          <input
            disabled={!editable}
            value={itemValue ? itemValue : ""}
            onChange={(e) => handleChange(e)}
            className="px-2 focus:ring-2 focus:outline-none focus:ring focus:ring-orange-500 block w-full sm:text-sm rounded-sm"
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
