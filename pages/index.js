import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { brickgraphRequest } from "../services/brickgraph-api";
import { MainPageLayout } from "../components/pageLayouts/mainPage/layout";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import StandardTable from "../components/visualisations/tables/standardTable";
import { GraphVisual } from "../components/visualisations/graph/GraphVisual";
import GoogleMap from "../components/visualisations/maps/googleMap";
import FilterMenu from "../components/modals/filterMenu";
import {
  OfficeBuildingIcon,
  HomeIcon,
  CurrencyPoundIcon,
} from "@heroicons/react/outline";
import { useNodeStore } from "../services/stores/nodeStore";
import { useEdgeStore } from "../services/stores/edgeStore";

export default function Home({ status, data }) {
  const [selectedTab, setSelectedTab] = useState("Graph");
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedFilteredNodes, setSelectedFilteredNodes] = useState([]);
  const userName = useUser().user.firstName;
  const {
    nodes: nodesInStore,
    setNodesInStore,
    updateNodeInStore,
    removeNodeInStore,
  } = useNodeStore();

  useEffect(() => {
    const nodesToSet = data.nodes;
    if (nodesInStore.length === 0) {
      setNodesInStore(nodesToSet);
    }
  }, []);

  const {
    edges: edgesInStore,
    setEdgesInStore,
    updateEdgeInStore,
    removeEdgeInStore,
  } = useEdgeStore();

  useEffect(() => {
    const edgesToSet = data.edges;
    if (edgesInStore.length === 0) {
      setEdgesInStore(edgesToSet);
    }
  }, []);

  const handleFilterMenu = () => {
    setFilterMenuVisible((current) => !current);
  };

  const view = () => {
    switch (selectedTab) {
      case "Graph":
        return (
          <GraphVisual
            data={{ nodes: nodesInStore, edges: edgesInStore }}
            height={"100%"}
            width={"100%"}
            nodeFilterSelections={selectedFilters}
          />
        );
      case "Table":
        return (
          <div className="px-6">
            <StandardTable
              data={nodesInStore}
              columnHeaders={[
                { label: "Label", field: "label" },
                { label: "Type", field: "group" },
              ]}
              filterSelections={selectedFilters}
              buttonText="View"
              buttonAction={(nodeId) => {
                setselectedNodeId(nodeId);
                setNodeModalVisible(true);
              }}
            />
          </div>
        );
      case "Map":
        // Filter markers by label 'Property' and if they have a lat and lng value
        const markers = nodesInStore.filter(
          (node) =>
            node.group === "Property" &&
            node.latitude !== null &&
            node.longitude !== null
        );

        markers.forEach((marker) => {
          marker.icon = OfficeBuildingIcon;
        });
        return (
          <div>
            <GoogleMap markers={markers} />
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

  if (status !== 200) {
    return (
      <div>
        <p>Something went wrong...</p>
      </div>
    );
  }

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
        handleNodeLabels={setSelectedFilters}
        handleNodeSelections={setSelectedFilteredNodes}
        currentLabelSelections={selectedFilters}
        currentNodeSelections={selectedFilteredNodes}
      />
    </>
  );
}

export const getServerSideProps = withServerSideAuth(async ({ req }) => {
  const { sessionId, getToken, params } = req.auth;

  if (!sessionId) {
    return {
      redirect: { destination: "/" },
    };
  }

  const token = await getToken();
  const { status, data } = await brickgraphRequest(token).get(
    "/search/subgraph"
  );

  // Redirect if user needs to set up their account
  if (status !== 200) {
    return {
      redirect: { destination: "/" },
    };
  }

  console.log(params);

  return { props: { status, data } };
});
