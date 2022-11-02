import Graph from "react-graph-vis";
import React, { useState, useEffect } from "react";
import ModalBase from "../../modals/modalBase";
import { nodesDictFunc } from "./toDictFunctions";

export const GraphVisual = ({
  events,
  data,
  height = "100%",
  width = "100%",
  filterSelections,
}) => {
  const [dataLoading, setIsDataLoading] = useState(true);
  const resetData = () => {
    setIsDataLoading((current) => !current);
  };

  // Refreshes graph when button is clicked, or data is changed
  useEffect(() => {
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

  const [graphData, setGraphData] = useState(data);

  const clearFilters = () => {
    setGraphData(data);
  };

  const handleNodeFilter = (selections) => {
    clearFilters();
    const nodes = data.nodes.filter((item) =>
      filterSelections.includes(item.group)
    );
    setGraphData({ nodes: nodes, edges: data.edges });
    setIsDataLoading((current) => !current);
    console.log(data);
  };

  useEffect(() => {
    setGraphData(graphData);
  }, [graphData]);

  const [hierarchical, setHierachical] = useState(false);
  const changeFormat = () => {
    setHierachical((current) => !current);
  };
  const options = {
    layout: {
      hierarchical: hierarchical,
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
    physics: {
      barnesHut: {
        springConstant: 0.5,
        avoidOverlap: 0.1,
      },
    },
  };

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
        <div className="absolute top-1 right-1 transform z-10">
          <button
            onClick={resetData}
            className="text-sm text-bold rounded border-slate-500 border-2 p-2 bg-slate-100 hover:bg-orange-500 hover:border-orange-500 text-grey-800 hover:text-white"
          >
            Refresh
          </button>
        </div>
        <div className="absolute top-1 left-1 transform z-10">
          <button
            onClick={changeFormat}
            className="text-sm text-bold rounded border-slate-500 border-2 p-2 bg-slate-100 hover:bg-orange-500 hover:border-orange-500 text-grey-800 hover:text-white"
          >
            {hierarchical ? "View: Hierarchy" : "View: Network"}
          </button>
        </div>
        <Graph
          graph={graphData}
          options={options}
          events={events}
          style={{ height: height, width: width }}
          clusterThreshold={100}
        />
      </div>
    </>
  );
};

export const VisGraph = ({ status, data }) => {
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

//export default VisGraph;
