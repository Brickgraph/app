import Graph from "react-graph-vis";
import React, { useState } from "react";
// import visData from "./testData_vis";
import ModalBase from "../modals/modalBase";
import { visNodesDictFunc } from "./testData_vis";

const VisGraph = ({ graphData, graphDataDict }) => {
  // console.log(graphData.nodes);
  const nodesData = visNodesDictFunc(graphData.nodes);
  // console.log(nodesData);
  const options = {
    layout: {
      hierarchical: false,
    },
    nodes: {
      shape: "circle",
      size: 12,
    },
    edges: {
      color: "orange",
      physics: false,
    },
    interaction: { hover: true },
  };
  const [nodeHovered, setNodeHovered] = useState(null);
  const [nodeSelected, setNodeSelected] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [state, setState] = useState({
    counter: 5,
    graph: graphData,
    events: {
      selectNode: function (e) {
        var { nodes, edges } = e;
        console.log(nodes[0]);
        var nodeId = nodes;
        var node = nodesData[nodeId];
        console.log(node);
        setNodeSelected(node);
        setIsModalVisible(true);
      },
      hoverNode: ({ node }) => {
        setNodeHovered(node);
      },
    },
  });
  const { graph, events } = state;
  return (
    <>
      <Graph
        graph={graph}
        options={options}
        events={events}
        style={{ height: "600px", width: "100%" }}
        clusterThreshold={100}
        physics={{ enabled: true, solver: "forceAtlas2Based" }}
      />
      {/* <div>
        <span>Selected: {nodeSelected}</span>
      </div> */}
      <div>
        <span>Hovered: {nodeHovered}</span>
      </div>
      <ModalBase
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <h1 className="text-2xl text-black">
          {nodeSelected ? nodeSelected.id : ""} -{" "}
          {nodeSelected ? nodeSelected.group : ""}
        </h1>
      </ModalBase>
    </>
  );
};

export default VisGraph;
