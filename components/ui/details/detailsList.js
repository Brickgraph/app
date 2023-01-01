import { DetailItem } from "./detail";
import { BarsIcon } from "../buttons/barsIcon";
import { useEffect, useState } from "react";

export function DetailsList({
  data,
  fields,
  editAction,
  blankValue = "",
  editRights = true,
}) {
  const [listItems, setListItems] = useState([]);
  const [detailsData, setDetailsData] = useState(data);

  useEffect(() => {
    setDetailsData(data);
  }, [data]);

  useEffect(() => {
    if (detailsData !== null) {
      setListItems([]);
      const newListItems = [];
      fields.map((field) => {
        const item = {
          key: field.id,
          label: field.label,
          type: field.type,
          editable: field.editable,
          value: detailsData[field.id] ? detailsData[field.id] : blankValue,
        };
        newListItems.push(item);
        setListItems(newListItems);
      });
    }
  }, [detailsData]);

  return (
    <>
      <dl className="divide-y divide-gray-200">
        {listItems.map((item) => {
          return (
            <div key={item.key}>
              <DetailItem
                detailId={detailsData.id}
                fieldId={item.key}
                label={item.label}
                value={item.value}
                type={item.type ? item.type : "text"}
                showReorder={true}
                ReorderIcon={BarsIcon}
                reorderAction={() => console.log(`Reordering ${item.value}`)}
                editable={editRights ? item.editable : false}
                editAction={editAction}
              />
            </div>
          );
        })}
      </dl>
    </>
  );
}
