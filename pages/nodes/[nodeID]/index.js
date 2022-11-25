import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { brickgraphRequest } from "../../../services/brickgraph-api";
import Router from "next/router";
import { useState } from "react";
import { NodePageLayout } from "../../../components/pageLayouts/nodePage/layout";

export default function NodePage({ status, data, accessData }) {
  const [tabSelected, setTabSelected] = useState("Details");
  console.log("DATA", accessData);
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

    return {
      props: { status, data, accessData },
    };
  }
);
