import React, { useState, useEffect } from "react";
import ModalBase from "../../modals/modalBase";
import { nodesDictFunc } from "../../../utils/toDictFunctions";
import GraphVisual from "./GraphVisual";
import FilterMenu from "../../modals/filterMenu";
import TableStickyHeaders from "../dataDisplays/tables/stickyHeaders";

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
  const [filterMenu, setFilterMenu] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [view, setView] = useState("table");

  const nodeModal = (nodeId) => {
    var node = nodesDict[nodeId];
    setNodeSelected(node);
    setIsModalVisible(true);
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

  const handleFilterMenu = () => {
    setFilterMenu((current) => !current);
  };

  // iterate over nodesGroup list and create a dict with id, label and value
  let uniqueNodeGroups = [...new Set(data.nodes.map((item) => item.group))];
  const nodeGroupsDict = uniqueNodeGroups.map((item) => {
    return { id: item, label: item, value: item };
  });

  const { graph, events } = state;

  return (
    <div className="flex flex-col p-4 overflow-auto w-auto">
      <div className="h-[calc(100vh-100px)]">
        {(() => {
          switch (view) {
            case "table":
              return (
                <TableStickyHeaders
                  data={graph.nodes}
                  filterSelections={selectedFilters}
                  openFilterMenu={handleFilterMenu}
                  editAction={nodeModal}
                  filterClear={() => setSelectedFilters([])}
                  switchView={() => setView("graph")}
                />
              );
            case "graph":
              return (
                <GraphVisual
                  events={events}
                  data={graph}
                  height={"100%"}
                  width={"100%"}
                  nodeFilterSelections={selectedFilters}
                  filterClear={() => setSelectedFilters([])}
                  openFilterMenu={handleFilterMenu}
                  switchView={() => setView("table")}
                />
              );
          }
        })()}
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
      <FilterMenu
        isOpen={filterMenu}
        handleClose={handleFilterMenu}
        handleNodeSelections={setSelectedFilters}
        currentSelections={selectedFilters}
        filterOptions={nodeGroupsDict}
      />
    </div>
  );
};
