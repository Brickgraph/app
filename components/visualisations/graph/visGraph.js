import Graph from "react-graph-vis";
import React, { useState, useEffect } from "react";
import ModalBase from "../../modals/modalBase";
import { nodesDictFunc } from "./toDictFunctions";

const GraphVisual = ({ isVisible, options, events, data }) => {
  if (isVisible !== true) {
    return (
      <>
        <div>Getting the graph for you now...</div>
      </>
    );
  }

  return (
    <>
      <Graph
        graph={data}
        options={options}
        events={events}
        style={{ height: "600px", width: "100%" }}
        clusterThreshold={100}
        physics={{ enabled: true, solver: "forceAtlas2Based" }}
      />
    </>
  );
};

const VisGraph = ({ status, data }) => {
  const [responseStatus, setResponseStatus] = useState(status);
  if (responseStatus !== 200) {
    return <div>No Data available right now... Please try again later.</div>;
  } else {
    const nodesDict = nodesDictFunc(data);
    const [dataLoading, setIsDataLoading] = useState(true);
    const [nodeHovered, setNodeHovered] = useState(null);
    const [nodeSelected, setNodeSelected] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const resetData = () => {
      setIsDataLoading((current) => !current);
    };

    useEffect(() => {
      var waitTime = 1000;
      setTimeout(() => {}, waitTime);
      setIsDataLoading(true);
    }, [dataLoading]);

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
      <>
        <button
          onClick={resetData}
          className="bg-orange-400 rounded border-black border-1 p-2 hover:bg-orange-500 text-grey-800 hover:text-white"
        >
          Redraw Graph
        </button>
        <div>
          <span className="inset-10 z-10 text-bold text-md lg:text-lg">
            {nodeHovered}
          </span>
        </div>
        <GraphVisual
          isVisible={dataLoading}
          options={options}
          events={events}
          data={graph}
        />

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
  }
};

export default VisGraph;
