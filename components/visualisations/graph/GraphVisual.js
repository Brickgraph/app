import Graph from "react-graph-vis";
import React, { useState, useEffect } from "react";
import { FilterIcon, TrashIcon } from "@heroicons/react/outline";
import { Tooltip } from "../../ui/tooltip";

const GraphVisual = ({
  events,
  data,
  height = "100%",
  width = "100%",
  nodeFilterSelections,
  filterClear,
  openFilterMenu,
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
        <div className="absolute bottom-1 right-1 transform z-10">
          <div
            data-bs-toggle="tooltip"
            title="Reset the visualisation"
            onClick={resetData}
            className="text-sm text-bold rounded border-slate-500 border-2 p-2 bg-slate-100 hover:bg-orange-500 hover:border-orange-500 text-grey-800 hover:text-white"
          >
            <span>Refresh</span>
          </div>
        </div>
        <div className="absolute top-1 right-12 transform z-10">
          <button
            data-bs-toggle="tooltip"
            title="Open the filter menu"
            onClick={openFilterMenu}
            className="text-sm text-bold rounded border-slate-500 border-2 p-2 bg-slate-100 hover:bg-orange-500 hover:border-orange-500 text-grey-800 hover:text-white"
          >
            <FilterIcon className="h-5 w-5 " aria-hidden="true" />
          </button>
        </div>
        <div className="absolute top-1 right-1 transform z-10">
          <button
            data-bs-toggle="tooltip"
            title="Clear all filters"
            onClick={filterClear}
            className="text-sm text-bold rounded border-slate-500 border-2 p-2 bg-slate-100 hover:bg-orange-500 hover:border-orange-500 text-grey-800 hover:text-white"
          >
            <TrashIcon className="h-5 w-5 " aria-hidden="true" />
          </button>
        </div>
        <div className="absolute top-1 left-1 transform z-10">
          <button
            data-bs-toggle="tooltip"
            title="Change the layout of the graph"
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

export default GraphVisual;
