import { DetailsList } from "../../ui/details/detailsList";
import { switchNodeForm } from "../../forms/config/handleNodeFormFields";
import { updateNode } from "../../../services/nodes/updateNode";
import { useNodeStore } from "../../../services/stores/nodeStore";

export function NodeDetails({ session, data }) {
  const fields = switchNodeForm(data.group);
  const { updateNodeInStore } = useNodeStore();
  const editValue = ({ nodeId, field, value }) => {
    const body = { [field]: value };
    const newNodeData = Object.assign({}, data);
    newNodeData[field] = value;
    console.log("New Node Data", newNodeData);
    updateNode({ session, nodeId, body });
    const { status, data } = updateNode({
      nodeId: nodeId,
      body: newNodeData,
    });
    console.log(data);
    if (status === 201) {
      updateNodeInStore({ newNodeData });
    }
  };
  return (
    <DetailsList
      data={data}
      fields={fields}
      editAction={editValue}
      blankValue={""}
    />
  );
}
