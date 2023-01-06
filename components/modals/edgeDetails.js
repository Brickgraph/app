import ModalBase from "./modalBase";
import { DetailsList } from "../ui/details/detailsList";
import { property2LeaseFields } from "../forms/config/edgeFields";
import { useEdgeStore } from "../../services/stores/edgeStore";
import { useNodeStore } from "../../services/stores/nodeStore";
import { useState, useEffect } from "react";

export const EdgeDetailsModal = ({
  sourceNodeId,
  targetNodeId,
  onClose,
  show,
}) => {
  const [edgeData, setEdgeData] = useState(null);
  const { edges } = useEdgeStore();
  const { nodes } = useNodeStore();

  console.log("Initial Source", sourceNodeId);
  console.log("Initial Target", targetNodeId);

  const sourceNode = nodes.filter((node) => node.id === sourceNodeId)[0];
  const targetNode = nodes.filter((node) => node.id === targetNodeId)[0];

  useEffect(() => {
    const data = edges?.filter(
      (edge) => edge.from === sourceNodeId && edge.to === targetNodeId
    )[0];
    console.log("Edge data", data);
    setEdgeData(data);
  }, [sourceNodeId, targetNodeId, edges]);

  return (
    <ModalBase onClose={onClose} show={show}>
      <div>{`${sourceNode ? sourceNode.label : ""} - [ ${
        edgeData ? edgeData.label : ""
      } ] -> ${targetNode ? targetNode.label : ""}`}</div>
      <form>
        {edgeData && (
          <DetailsList
            data={edgeData}
            fields={property2LeaseFields}
            editAction={() => console.log("edit")}
          />
        )}
      </form>
    </ModalBase>
  );
};
