import React, { useState, useEffect } from "react";
import ModalBase from "../../modals/modalBase";
import { nodesDictFunc } from "../../../utils/toDictFunctions";
import GraphVisual from "./GraphVisual";
import FilterMenu from "../../modals/filterMenu";
import TableStickyHeaders from "../dataDisplays/tables/stickyHeaders";
import { NodeDetailsModal } from "../../modals/nodeDetails";

export const VisGraph = ({ status, data }) => {
  const [responseStatus, setResponseStatus] = useState(status);
  const [view, setView] = useState("table");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterMenu, setFilterMenu] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const nodesDict = nodesDictFunc(data);
  const [nodeHovered, setNodeHovered] = useState(null);
  const [nodeSelected, setNodeSelected] = useState(null);

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

  const nodeModal = (nodeId) => {
    var node = nodesDict[nodeId];
    setNodeSelected(node);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setNodeSelected(null);
    setNodeHovered(null);
  };

  const handleFilterMenu = () => {
    setFilterMenu((current) => !current);
  };

  // iterate over nodesGroup list and create a dict with id, label and value
  let uniqueNodeGroups = [...new Set(data.nodes.map((item) => item.group))];
  const nodeGroupsDict = uniqueNodeGroups.map((item) => {
    return { id: item, label: item, value: item };
  });

  const { graph, events } = state;

  if (responseStatus !== 200) {
    return (
      <div>
        No Data available right now... Please try again later. Looks like a{" "}
        {responseStatus} error.
      </div>
    );
  }

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
      <NodeDetailsModal
        node={nodeSelected}
        show={isModalVisible}
        onClose={() => handleModalClose()}
      />
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
