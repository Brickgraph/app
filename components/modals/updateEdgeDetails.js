import ModalBase from "./modalBase";
import { DetailsList } from "../ui/details/detailsList";
import { property2LeaseFields } from "../forms/config/edgeFields";
import { useEdgeStore } from "../../services/stores/edgeStore";
import { useNodeStore } from "../../services/stores/nodeStore";

export const EdgeDetailsModal = ({
  sourceNodeId,
  targetNodeId,
  onClose,
  show,
}) => {
  const { edges } = useEdgeStore();
  const { nodes } = useNodeStore();

  const sourceNode = nodes.filter((node) => node.id === sourceNodeId)[0];
  const targetNode = nodes.filter((node) => node.id === targetNodeId)[0];
  const edgeData = edges.filter(
    (edge) => edge.from === sourceNodeId && edge.to === targetNodeId
  )[0];

  // set 'from' and 'to' fields in edgeData to node labels
  //edgeData.from = sourceNode.label;
  //edgeData.to = targetNode.label;

  return (
    <ModalBase onClose={onClose} show={show}>
      <div>{`${sourceNode.label} ${edgeData.label.toLowerCase()} ${
        targetNode.label
      }`}</div>
      <form>
        <DetailsList
          data={edgeData}
          fields={property2LeaseFields}
          editAction={() => console.log("edit")}
        />
      </form>
    </ModalBase>
  );
};
