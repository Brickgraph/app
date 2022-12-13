import { DetailsList } from "../../ui/details/detailsList";
import { switchNodeForm } from "../../forms/config/handleNodeFormFields";
import { updateNode } from "../../../services/nodes/updateNode";
import { useState } from "react";
import { useSession } from "@clerk/nextjs";
import { useNodeStore } from "../../../services/stores/nodeStore";

export function NodeDetails({ data }) {
  const [nodeData, setNodeData] = useState(data);
  const { session } = useSession();
  let { updateNodeInStore } = useNodeStore();
  let fields = switchNodeForm(nodeData.group);

  const editValue = async ({ nodeId, field, value }) => {
    const { getToken } = session;
    const token = await getToken();
    const body = { [field]: value };
    let newNodeData = Object.assign({}, nodeData);
    newNodeData[field] = value;

    const { status, data } = await updateNode({
      token: token,
      nodeId: nodeId,
      body: newNodeData,
    });

    if (status === 201) {
      console.log("New Node Data", data);
      updateNodeInStore(newNodeData);
      setNodeData(newNodeData);
    }
  };
  return (
    <DetailsList
      data={nodeData}
      fields={fields}
      editAction={editValue}
      blankValue={""}
    />
  );
}
