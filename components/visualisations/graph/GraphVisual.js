import Graph from "react-graph-vis";
import React, { useState, useEffect } from "react";
import {
  RefreshIcon,
  GlobeAltIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";

export default function GraphVisual({
  data,
  height = "100%",
  width = "100%",
  nodeFilterSelections = [],
  nodeSelectAction = null,
  edgeSelectAction = null,
}) {
  const [dataLoading, setIsDataLoading] = useState(true);
  const [graphData, setGraphData] = useState(data);
  const [graphState, setGraphState] = useState(
    {
      graph: data,
      events: {
        selectNode: (e) => {
          var { nodes } = e;
          var nodeId = nodes[0];
          nodeSelectAction(nodeId);
        },
        /* hoverNode: ({ node }) => {
          setNodeHovered(node);
        }, */
        selectEdge: (e) => {
          var { edges } = e;
          var edgeId = edges[0];
          edgeSelectAction(edgeId);
        },
      },
    },
    []
  );

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

  const clearFilters = () => {
    setGraphData(data);
  };

  const handleNodeFilter = () => {
    clearFilters();
    if (
      !Array.isArray(nodeFilterSelections) ||
      nodeFilterSelections.length === 0
    ) {
      return;
    }
    const nodes = data.nodes.filter((item) =>
      nodeFilterSelections.includes(item.group)
    );
    setGraphData({ nodes: nodes, edges: data.edges });
    setIsDataLoading((current) => !current);
  };

  useEffect(() => {
    setGraphData(graphData);
  }, [graphData]);

  useEffect(() => {
    handleNodeFilter(nodeFilterSelections);
  }, [nodeFilterSelections]);

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
      scaling: {
        min: 20,
        max: 20,
        label: { enabled: false },
      },
      widthConstraint: 100,
    },
    edges: {
      color: "orange",
      physics: false,
      font: {
        size: 10,
      },
      shadow: { enabled: false, size: 3 },
      smooth: { enabled: false },
    },
    interaction: {
      hover: true,
      navigationButtons: true,
      hoverConnectedEdges: true,
      hideEdgesOnDrag: false,
      hideNodesOnDrag: false,
    },
    physics: {
      forceAtlas2Based: {
        gravitationalConstant: -40,
        centralGravity: 0.003,
        springLength: 1,
        springConstant: 1000,
        avoidOverlap: 1.2,
      },
      maxVelocity: 250,
      solver: "forceAtlas2Based",
      timestep: 0.35,
      stabilization: {
        enabled: true,
        iterations: 1000,
        updateInterval: 25,
      },
    },
  };

  const { events } = graphState;

  if (dataLoading !== true) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <div className="relative h-[calc(100vh-100px)]">
        <div className="absolute flex flex cols-2 top-4 right-4 gap-2 transform z-10">
          <button
            data-bs-toggle="tooltip"
            title="Change the layout of the graph"
            onClick={changeFormat}
            className="text-sm text-bold rounded border-slate-500 border-2 p-2 bg-slate-100 hover:bg-orange-500 hover:border-orange-500 text-grey-800 hover:text-white"
          >
            {hierarchical ? (
              <GlobeAltIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <ViewGridIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
          <button
            data-bs-toggle="tooltip"
            title="Clear all filters"
            onClick={resetData}
            className="text-sm text-bold rounded border-slate-500 border-2 p-2 bg-slate-100 hover:bg-orange-500 hover:border-orange-500 text-grey-800 hover:text-white"
          >
            <RefreshIcon className="h-5 w-5" aria-hidden="true" />
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
}
