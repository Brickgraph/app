import Graph from "react-graph-vis";
import React, { useState, useEffect } from "react";
import ModalBase from "../../modals/modalBase";
import { nodesDictFunc } from "./toDictFunctions";

export const GraphVisual = ({
  options,
  events,
  data,
  height = "100%",
  width = "100%",
}) => {
  const [dataLoading, setIsDataLoading] = useState(true);
  const resetData = () => {
    setIsDataLoading((current) => !current);
  };

  // Refreshes graph when button is clicked
  useEffect(() => {
    var waitTime = 1000;
    setTimeout(() => {}, waitTime);
    setIsDataLoading(true);
  }, [dataLoading]);

  // Refreshes graph when window is resized
  useEffect(() => {
    const handleResize = () => {
      setIsDataLoading(false);
    };
    window.addEventListener("resize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });

  if (dataLoading !== true) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <div className="relative h-full">
        <div className="absolute top-0 right-0 transform z-10">
          <div>
            <button
              onClick={resetData}
              className="text-sm text-bold rounded border-orange-500 border-1 p-2 hover:bg-orange-500 text-grey-800 hover:text-white"
            >
              Refresh
            </button>
          </div>
        </div>
        <Graph
          graph={data}
          options={options}
          events={events}
          style={{ height: height, width: width }}
          clusterThreshold={100}
          physics={{ enabled: true, solver: "forceAtlas2Based" }}
        />
      </div>
    </>
  );
};

const VisGraph = ({ status, data }) => {
  const [responseStatus, setResponseStatus] = useState(status);
  if (responseStatus !== 200) {
    return <div>No Data available right now... Please try again later.</div>;
  }

  const nodesDict = nodesDictFunc(data);
  const [nodeHovered, setNodeHovered] = useState(null);
  const [nodeSelected, setNodeSelected] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    <div className="flex flex-col">
      <div>
        <GraphVisual
          options={options}
          events={events}
          data={graph}
          height={"500px"}
          width={"100%"}
        />
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
    </div>
  );
};

export default VisGraph;
