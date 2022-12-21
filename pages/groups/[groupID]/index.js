import { GroupPageLayout } from "../../../components/pageLayouts/groupPage/layout";
import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { brickgraphRequest } from "../../../services/brickgraph-api";
import { useState } from "react";
import Router from "next/router";
import { GroupDetailsLayout } from "../../../components/pageLayouts/groupPage/details";

export default function GroupPage({ status, data }) {
  const [tabSelected, setTabSelected] = useState("Details");
  const section = () => {
    switch (tabSelected) {
      case "Details":
        return <GroupDetailsLayout data={data} />;
      case "Users":
        return <div>{data.label} Users</div>;
      case "Permissions":
        return <div>{data.label} Manage Permissions</div>;
      default:
        return <GroupDetailsLayout data={data} />;
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
      <GroupPageLayout
        data={data}
        selectedTab={tabSelected}
        handleSection={setTabSelected}
      >
        <div className="p-2">{section()}</div>
      </GroupPageLayout>
    </>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, resolvedUrl, params }) => {
    const { sessionId, getToken } = req.auth;
    const { groupID } = params;

    if (!sessionId) {
      return {
        redirect: { destination: "/?redirect_url=" + resolvedUrl },
      };
    }

    const token = await getToken();

    // Retrieve the subgraph of this selected node
    const { status, data } = await brickgraphRequest(token)
      .get(`nodes/${groupID}`)
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
      props: { status, data },
    };
  }
);
