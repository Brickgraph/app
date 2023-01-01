import { useNodeStore } from "../../../services/stores/nodeStore";
import { useState, useEffect } from "react";
import { NodeDetailsModal } from "../../modals/nodeDetails";

export const NodeDetailInput = ({ nodeId, inputId }) => {
  const { nodes } = useNodeStore();
  const [showModal, setShowModal] = useState(false);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [node, setNode] = useState(null);
  //const node = nodes.filter((n) => n.id === nodeId)[0];

  useEffect(() => {
    if (!node) {
      setNode(nodes.filter((n) => n.id === nodeId)[0]);
      setDataIsLoaded(true);
    }
  }, [nodeId]);

  if (!dataIsLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="block w-full bg-white border border-gray-300 rounded-md focus:bg-gray-50 focus:ring-orange-500 focus:border-orange-500 p-2">
        <button id={inputId} onClick={() => setShowModal(true)}>
          <span className="text-sm md:text-md text-gray-900 ">
            {node ? node.label : "No label"}
          </span>
          <span className="text-sm md:text-md text-gray-700 italic pl-2">
            {node ? node.group : "No group"}
          </span>
        </button>
      </div>
      <NodeDetailsModal
        show={showModal}
        nodeId={nodeId}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};
