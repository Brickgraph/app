import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { brickgraphRequest } from "../services/brickgraph-api";
import { MainPageLayout } from "../components/pageLayouts/mainPage/layout";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import StandardTable from "../components/visualisations/tables/standardTable";
import GraphVisual from "../components/visualisations/graph/GraphVisual";
import GoogleMap from "../components/visualisations/maps/googleMap";
import FilterMenu from "../components/modals/filterMenu";
import { NodeDetailsModal } from "../components/modals/nodeDetails";
import {
  OfficeBuildingIcon,
  HomeIcon,
  CurrencyPoundIcon,
} from "@heroicons/react/outline";
import { useNodeStore } from "../services/stores/nodeStore";
import { useEdgeStore } from "../services/stores/edgeStore";

export default function Home({ token, status, data }) {
  const [selectedTab, setSelectedTab] = useState("Graph");
  const [nodeModalVisible, setNodeModalVisible] = useState(false);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedNodeID, setSelectedNodeID] = useState(null);
  const [selectedEdgeID, setSelectedEdgeID] = useState(null);
  const userName = useUser().user.firstName;
  const {
    nodes: nodesInStore,
    setNodesInStore,
    updateNodeInStore,
    removeNodeInStore,
  } = useNodeStore();
  useEffect(() => {
    if (nodesInStore.length === 0) {
      setNodesInStore(data.nodes);
    }
  }, []);

  const {
    edges: edgesInStore,
    setEdgesInStore,
    updateEdgeInStore,
    removeEdgeInStore,
  } = useEdgeStore();
  useEffect(() => {
    if (edgesInStore.length === 0) {
      setEdgesInStore(data.edges);
    }
  }, []);

  const showStore = () => {
    console.log("Node Store", nodesInStore);
    console.log("Edge Store", edgesInStore);
  };

  const clearStore = () => {
    setNodesInStore([]);
    setEdgesInStore([]);
  };

  const resetNodeStore = () => {
    const clearStore = () => {
      clearStore();
    };
    setNodesInStore(data.nodes);
    setEdgesInStore(data.edges);
  };

  const graphData = { nodes: nodesInStore, edges: edgesInStore };

  let uniqueNodeGroups = [
    ...new Set(graphData.nodes.map((item) => item.group)),
  ];
  const nodeGroupsDict = uniqueNodeGroups.map((item) => {
    const splitItem = item.split(", ");
    return { id: item, label: item, value: item };
  });

  const handleFilterMenu = () => {
    setFilterMenuVisible((current) => !current);
  };

  const view = () => {
    switch (selectedTab) {
      case "Graph":
        return (
          <GraphVisual
            data={graphData}
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
              data={graphData.nodes}
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
      case "Map":
        const markers = [
          { id: 14, lat: 51.5, lng: 0.09, label: "Resi", icon: HomeIcon },
          {
            id: 16,
            lat: 52.6,
            lng: 1.09,
            label: "Industrial",
            icon: OfficeBuildingIcon,
          },
          {
            id: 10,
            lat: 50.9,
            lng: 0.2,
            label: "Retail",
            icon: CurrencyPoundIcon,
          },
          {
            id: 12,
            lat: 51.7,
            lng: -1.09,
            label: "Office",
            icon: OfficeBuildingIcon,
          },
        ];
        const onClickAction = (marker) => {
          console.log(marker);
          setSelectedNodeID(marker.id);
          setNodeModalVisible(true);
        };
        return (
          <div>
            <GoogleMap
              markers={markers}
              selectedMarker={(e) => onClickAction(e)}
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
        <div className="flex">
          <button
            className="px-4 border border-2 border-gray-300"
            onClick={() => showStore()}
          >
            Show Store{" "}
          </button>
          <button
            className="px-4 border border-2 border-gray-300"
            onClick={() => clearStore()}
          >
            Clear Store
          </button>
          <button
            className="px-4 border border-2 border-gray-300"
            onClick={() => resetNodeStore()}
          >
            Reset Store
          </button>
        </div>

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
    const { status, data } = await brickgraphRequest(token).get(
      "/search/subgraph"
    );
    //const nodeStore = useNodeStore((state) => state.setNodes(data.nodes));

    return { props: { token, status, data } };
  }
);
