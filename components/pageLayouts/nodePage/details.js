import { DetailsList } from "../../ui/details/detailsList";
import { switchNodeForm } from "../../forms/config/handleNodeFormFields";
import { updateNode } from "../../../services/nodes/updateNode";
import { useState } from "react";
import { useSession } from "@clerk/nextjs";
import { useNodeStore } from "../../../services/stores/nodeStore";

export function NodeDetails({ data, editRights }) {
  const [nodeData, setNodeData] = useState(data);
  const { session } = useSession();
  let { updateNodeInStore } = useNodeStore();
  let fields = switchNodeForm(nodeData.group);

  const editValue = async ({ refId: nodeId, body }) => {
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
      updateNodeInStore(newNodeData);
      setNodeData(newNodeData);
      //console.log("Update successful", newNodeData);
    }
  };
  return (
    <DetailsList
      data={nodeData}
      fields={fields}
      editAction={editValue}
      blankValue={""}
      editRights={editRights}
    />
  );
}
