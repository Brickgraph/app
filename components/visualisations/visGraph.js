import Graph from "react-graph-vis";
import React, { useState } from "react";
// import visData from "./testData_vis";

const VisGraph = ({ graphData }) => {
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

  const [state, setState] = useState({
    counter: 5,
    graph: graphData,
    events: {
      select: ({ nodes, edges }) => {
        // alert("Welome to Brickgraph");
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
      },
      hoverNode: ({ node }) => {
        console.log(node);
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
      <span>{nodeHovered}</span>
    </>
  );
};

export default VisGraph;
