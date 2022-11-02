import React, { useState, useEffect } from "react";
import ModalBase from "../../modals/modalBase";
import { nodesDictFunc } from "../../../utils/toDictFunctions";
import GraphVisual from "./GraphVisual";

export const VisGraph = ({
  status,
  data,
  nodeSelections,
  filterClear,
  openFilterMenu,
}) => {
  const [responseStatus, setResponseStatus] = useState(status);
  if (responseStatus !== 200) {
    return (
      <div>
        No Data available right now... Please try again later. Looks like a{" "}
        {responseStatus} error.
      </div>
    );
  }

  const nodesDict = nodesDictFunc(data);
  const [nodeHovered, setNodeHovered] = useState(null);
  const [nodeSelected, setNodeSelected] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [state, setState] = useState(
    {
      counter: 5,
      graph: data,
      events: {
        selectNode: function (e) {
          var { nodes, edges } = e;
          var nodeId = nodes;
          var node = nodesDict[nodeId];
          setNodeSelected(node);
          setIsModalVisible(true);
        },
        hoverNode: ({ node }) => {
          setNodeHovered(node);
        },
      },
    },
    []
  );

  const { graph, events } = state;

  return (
    <div className="flex flex-col p-4 overflow-auto">
      <div className="h-[calc(100vh-100px)] border-grey-300 border-2">
        <GraphVisual
          events={events}
          data={graph}
          height={"100%"}
          width={"100%"}
          nodeFilterSelections={nodeSelections}
          filterClear={filterClear}
          openFilterMenu={openFilterMenu}
        />
      </div>

      <ModalBase
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <h1 className="text-xl text-orange-700 text-bold">
          {nodeSelected ? nodeSelected.group : ""}:{" "}
          {nodeSelected ? nodeSelected.label : ""}
        </h1>
        <br />
        <h1 className="text-lg text-orange-800 text-bold">Details</h1>
        <ul>
          {nodeSelected
            ? Object.keys(nodeSelected).map((key) => {
                return (
                  <>
                    <div>
                      <li key={nodeSelected.id}>
                        <p className="text-md">
                          <span className="text-bold text-orange-900">
                            {key}
                          </span>
                          : {nodeSelected[key]}
                        </p>
                      </li>
                    </div>
                  </>
                );
              })
            : ""}
        </ul>
      </ModalBase>
    </div>
  );
};
