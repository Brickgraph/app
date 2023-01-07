import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { brickgraphRequest } from "../../../services/brickgraph-api";
import Router from "next/router";
import { useState } from "react";
import { NodePageLayout } from "../../../components/pageLayouts/nodePage/layout";
import { NodeDetails } from "../../../components/pageLayouts/nodePage/details";
import { NodeAccess } from "../../../components/pageLayouts/nodePage/access";
import { useNodeStore } from "../../../services/stores/nodeStore";
import { GraphVisual } from "../../../components/visualisations/graph/GraphVisual";

export default function NodePage({ nodePayload }) {
  const [tabSelected, setTabSelected] = useState("Details");
  const { nodes: nodesInStore } = useNodeStore();

  const { status, data } = nodePayload;
  if (status !== 200) {
    Router.push("/404");
  }

  const nodeData = nodesInStore.find((node) => node.id === data.id);
  const editRights = nodePayload.accessData.level_int > 1 ? true : false;
  const { nodes: subgraphNodes, edges: subgraphEdges } =
    nodePayload.subgraphData;

  const section = () => {
    switch (tabSelected) {
      case "Details":
        return <NodeDetails data={nodeData} editRights={editRights} />;
      case "Connections":
        return (
          <GraphVisual data={{ nodes: subgraphNodes, edges: subgraphEdges }} />
        );
      case "Logs":
        return (
          <div>
            Logs - <span className="italic">coming soon...</span>
          </div>
        );
      case "Access":
        return <NodeAccess data={nodeData} editRights={editRights} />;
      default:
        return <div>Details</div>;
    }
  };
  if (status !== 200) {
    Router.push("/");
    return (
      <div>
        Nothing to see here. Redirecting you back to the main page now...
      </div>
    );
  }
  return (
    <>
      <NodePageLayout
        data={nodeData}
        selectedTab={tabSelected}
        handleSection={setTabSelected}
      >
        {section()}
      </NodePageLayout>
    </>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, params }) => {
    const { sessionId, getToken } = req.auth;
    const { nodeID } = params;

    if (!sessionId) {
      return {
        redirect: { destination: "/sign-in" },
      };
    }

    //const user = await getUserById(userId);
    const token = await getToken();

    // Retrieve the details of this selected node
    const { status, data } = await brickgraphRequest(token)
      .get("nodes/" + nodeID)
      .then((res) => {
        return { data: res.data, status: res.status };
      })
      .catch((err) => {
        return {
          data: err.response.data,
          status: err.response.status,
        };
      });

    const { accessStatus, accessData } = await brickgraphRequest(token)
      .get(`nodes/${nodeID}/permission`)
      .then((res) => {
        return { accessData: res.data, accessStatus: res.status };
      })
      .catch((err) => {
        return {
          accessData: err.response.data,
          accessStatus: err.response.status,
        };
      });

    const { subgraphStatus, subgraphData } = await brickgraphRequest(token)
      .get(`nodes/${nodeID}/subgraph`)
      .then((res) => {
        return { subgraphData: res.data, subgraphStatus: res.status };
      })
      .catch((err) => {
        return {
          subgraphData: err.response.data,
          subgraphStatus: err.response.status,
        };
      });

    if (
      data.group.includes("Organisation") | data.group.includes("UserGroup")
    ) {
      return {
        redirect: {
          destination: "/groups/" + nodeID,
        },
      };
    }

    const nodePayload = {
      status: status,
      data: data,
      accessStatus: accessStatus,
      accessData: accessData,
      subgraphStatus: subgraphStatus,
      subgraphData: subgraphData,
    };

    return {
      props: { nodePayload },
    };
  }
);
