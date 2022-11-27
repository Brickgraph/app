import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { brickgraphRequest } from "../services/brickgraph-api";
import { VisGraph } from "../components/visualisations/graph/VisGraph";
import { MainPageLayout } from "../components/pageLayouts/mainPage/layout";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import StandardTable from "../components/visualisations/tables/standardTable";
import GraphVisual from "../components/visualisations/graph/GraphVisual";
import FilterMenu from "../components/modals/filterMenu";
import { NodeDetailsModal } from "../components/modals/nodeDetails";

export default function Home({ token, status, data }) {
  const [selectedTab, setSelectedTab] = useState("Graph");
  const [nodeModalVisible, setNodeModalVisible] = useState(false);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedNodeID, setSelectedNodeID] = useState(null);
  const [selectedEdgeID, setSelectedEdgeID] = useState(null);
  const userName = useUser().user.firstName;

  let uniqueNodeGroups = [...new Set(data.nodes.map((item) => item.group))];
  const nodeGroupsDict = uniqueNodeGroups.map((item) => {
    return { id: item, label: item, value: item };
  });

  const handleFilterMenu = () => {
    setFilterMenuVisible((current) => !current);
  };

  const handleNewItemMenu = () => {
    console.log("Create something new.");
  };

  const view = () => {
    switch (selectedTab) {
      case "Graph":
        return (
          <GraphVisual
            data={data}
            height={"100%"}
            width={"100%"}
            nodeFilterSelections={selectedFilters}
            nodeSelectAction={(nodeId) => {
              setSelectedNodeID(nodeId);
              setNodeModalVisible(true);
            }}
            edgeSelectAction={(edgeId) => {
              setSelectedEdgeID(edgeId);
            }}
          />
        );
      case "Table":
        return (
          <div className="px-6">
            <StandardTable
              data={data.nodes}
              columnHeaders={[
                { label: "Label", field: "label" },
                { label: "Type", field: "group" },
              ]}
              filterSelections={selectedFilters}
              buttonText="View"
              buttonAction={(nodeId) => {
                setSelectedNodeID(nodeId);
                setNodeModalVisible(true);
              }}
            />
          </div>
        );
      default:
        return (
          <>
            <p>Default View</p>
          </>
        );
    }
  };

  return (
    <>
      <MainPageLayout
        title={`Welcome, ${userName}`}
        selectedTab={selectedTab}
        onSelect={setSelectedTab}
        filterButtonAction={() => handleFilterMenu()}
        newButtonAction={() => handleNewItemMenu()}
      >
        <div className="mx-auto max-w-7xl border border-1 border-gray-200">
          {view()}
        </div>
      </MainPageLayout>
      <FilterMenu
        isOpen={filterMenuVisible}
        handleClose={handleFilterMenu}
        handleNodeSelections={setSelectedFilters}
        currentSelections={selectedFilters}
        filterOptions={nodeGroupsDict}
      />
      <NodeDetailsModal
        nodeID={selectedNodeID ? selectedNodeID : null}
        show={nodeModalVisible}
        onClose={() => {
          setSelectedNodeID(null);
          setNodeModalVisible(false);
        }}
      />
    </>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, resolvedUrl }) => {
    const { sessionId, getToken } = req.auth;

    if (!sessionId) {
      return {
        redirect: { destination: "/sign-in?redirect_url=" + resolvedUrl },
      };
    }

    const token = await getToken();
    const { status, data } = await brickgraphRequest(token).get("subgraph");

    return { props: { token, status, data } };
  }
);
