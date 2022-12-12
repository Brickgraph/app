import { DetailItem } from "./detail";
import { BarsIcon } from "../buttons/barsIcon";

export function DetailsList({ data, fields, editAction, blankValue = "" }) {
  let listItems = [];

  if (data !== null) {
    fields.map((field) => {
      const item = {
        key: field.id,
        label: field.label,
        editable: field.editable,
        value: data[field.id] ? data[field.id] : blankValue,
      };
      listItems.push(item);
    });
  }

  return (
    <>
      <dl className="divide-y divide-gray-200">
        {listItems.map((item) => {
          return (
            <div key={item.key}>
              <DetailItem
                detailId={data.id}
                fieldId={item.key}
                label={item.label}
                value={item.value}
                showReorder={true}
                ReorderIcon={BarsIcon}
                reorderAction={() => console.log(`Reordering ${item.value}`)}
                editable={item.editable}
                editAction={editAction}
              />
            </div>
          );
        })}
      </dl>
    </>
  );
}
