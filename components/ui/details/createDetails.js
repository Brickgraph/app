import { useState } from "react";
import { DetailItem } from "./detail";
import { BarsIcon } from "../buttons/barsIcon";
import { useSession } from "@clerk/nextjs";
import { useNodeStore } from "../../../services/stores/nodeStore";
import { switchNodeForm } from "../../forms/config/handleNodeFormFields";

export const CreateNodeDetails = ({
  nodeLabel,
  editAction,
  blankValue = "",
  editRights = true,
  showReorder = false,
}) => {
  const [body, setBody] = useState({});
  const { session } = useSession();
  let { addNodeToStore } = useNodeStore();
  let fields = switchNodeForm(nodeLabel);

  const createNode = async ({ refId: nodeId, body }) => {
    const { getToken } = session;
    const token = await getToken();
    let newNodeData = Object.assign({}, nodeData);

    // iterate through body to get field and value and update newNodeData
    for (const [key, value] of Object.entries(body)) {
      newNodeData[key] = value;
    }

    const { status } = await updateNode({
      token: token,
      nodeId: nodeId,
      body: body,
    });

    if (status === 201) {
      addNodeToStore(newNodeData);
      setBody(newNodeData);
      console.log("Updated node data", newNodeData);
    }
  };

  const handleChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const clearSelections = () => {
    setBody({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit", body);
  };
  return (
    <>
      <div>
        <dl className="divide-y divide-gray-200">
          {fields.map((field) => {
            return (
              <div key={field.key}>
                <DetailItem
                  detailId={""}
                  fieldId={field.key}
                  label={field.label}
                  value={field.defaultValue ? field.defaultValue : null}
                  type={field.type ? field.type : "text"}
                  showReorder={showReorder}
                  ReorderIcon={BarsIcon}
                  reorderAction={() => console.log(`Reordering ${field.value}`)}
                  editable={editRights ? field.editable : false}
                  editAction={editAction}
                />
              </div>
            );
          })}
        </dl>
        <div className="flex flex-shrink-0 justify-end px-4 py-4">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            onClick={() => clearSelections()}
          >
            Clear
          </button>
          <button
            type="submit"
            className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-orange-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            onClick={() => handleSubmit()}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};
