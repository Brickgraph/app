import Graph from "react-graph-vis";
import React, { useState, useEffect } from "react";
import {
  RefreshIcon,
  GlobeAltIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import { useNodeStore } from "../../../services/stores/nodeStore";
import { useEdgeStore } from "../../../services/stores/edgeStore";
import { LoadingSpinner } from "../../ui/loading/loadingSpinner";
import { NodeDetailsModal } from "../../modals/nodeDetails";
import { graphOptions } from "./graphOptions";

export function GraphVisual({
  data,
  height = "100%",
  width = "100%",
  nodeFilterSelections = [],
  nodeSelectAction = null,
  edgeSelectAction = null,
}) {
  const [dataLoading, setIsDataLoading] = useState(true);
  const [graphData, setGraphData] = useState(data);

  const [nodeSelected, setNodeSelected] = useState(null);
  const [edgeSelected, setEdgeSelected] = useState(null);

  const { nodes } = useNodeStore();
  const { edges } = useEdgeStore();

  const [graphState, setGraphState] = useState(
    {
      graph: data,
      events: {
        selectNode: (e) => {
          var { nodes } = e;
          var nodeId = nodes[0];
          nodeSelectAction(nodeId);
          var selectedNode = nodes.filter((node) => node.id === nodeId);
          setNodeSelected(selectedNode);
        },
        /* hoverNode: ({ node }) => {
          setNodeHovered(node);
        }, */
        selectEdge: (e) => {
          var { edges } = e;
          var edgeId = edges[0];
          edgeSelectAction(edgeId);
          var selectedEdge = edges.filter((edge) => edge.id === edgeId);
          setEdgeSelected(selectedEdge);
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
  }, [data]);

  useEffect(() => {
    handleNodeFilter(nodeFilterSelections);
  }, [nodeFilterSelections]);

  const [hierarchical, setHierachical] = useState(false);
  const changeFormat = () => {
    setHierachical((current) => !current);
  };

  const { events } = graphState;

  if (dataLoading !== true) {
    return (
      <>
        <div className="flex items-center place-content-center h-[calc(100vh-100px)]">
          <LoadingSpinner message={"Refreshing graph loading spinner..."} />
          <span>Refreshing graph...</span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="relative h-[calc(100vh-100px)]">
        <div className="absolute flex cols-2 top-4 right-4 gap-2 transform z-10">
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
          options={graphOptions(hierarchical)}
          events={events}
          style={{ height: height, width: width }}
          clusterThreshold={100}
        />
      </div>
    </>
  );
}
