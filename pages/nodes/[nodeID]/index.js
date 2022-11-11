import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { brickgraphRequest } from "../../../services/brickgraph-api";
import Router from "next/router";
import { useState } from "react";
import { NodePageLayout } from "../../../components/layout/nodePage/layout";

const tabs = [
  { name: "Details", href: "#", current: true },
  { name: "Connections", href: "#", current: false },
  { name: "Logs", href: "#", current: false },
  { name: "Permissions", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NodePage({ nodeID, status, data }) {
  const [tabSelected, setTabSelected] = useState(0);
  console.log("TAB", tabSelected);
  const section = () => {
    switch (tabSelected) {
      case "Details":
        return <div>{data.label} Details</div>;
      case "Connections":
        return <div>GRAPH GOES HERE</div>;
      case "Logs":
        return <div>{data.group} Logs</div>;
      case "Permissions":
        return <div>{data.label} Permissions</div>;
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
        data={data}
        selectedTab={tabSelected}
        handleSection={setTabSelected}
      >
        {section()}
      </NodePageLayout>
    </>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, resolvedUrl, params }) => {
    const { sessionId, getToken } = req.auth;
    const { nodeID } = params;

    if (!sessionId) {
      return {
        redirect: { destination: "/?redirect_url=" + resolvedUrl },
      };
    }

    //const user = await getUserById(userId);
    const token = await getToken();

    // Retrieve the subgraph of this selected node
    const { status, data } = await brickgraphRequest(token)
      .get("test/node_id?node_id=" + nodeID)
      .then((res) => {
        return { data: res.data, status: res.status };
      })
      .catch((err) => {
        return {
          data: err.response.data,
          status: err.response.status,
        };
      });

    return {
      props: { nodeID, status, data },
    };
  }
);
