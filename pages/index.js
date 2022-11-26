import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { brickgraphRequest } from "../services/brickgraph-api";
import { VisGraph } from "../components/visualisations/graph/VisGraph";
import {
  mainPageTabs,
  MainPageHeader,
} from "../components/pageLayouts/mainPage/mainPageHeader";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function Home({ token, status, data }) {
  const [selectedTab, setSelectedTab] = useState("Graph");
  const userName = useUser().user.firstName;
  console.log(selectedTab.toLowerCase());

  const switchView = (view) => {
    switch (view) {
      case "Graph":
        return (
          <>
            <p>Graph View</p>
          </>
        );
      case "Table":
        return (
          <>
            <p>Table View</p>
          </>
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
      <MainPageHeader
        title={`Welcome, ${userName}`}
        tabs={mainPageTabs}
        selectedTab={selectedTab}
        onSelect={setSelectedTab}
      />
      {/* {switchView(selectedTab)} */}
      <div className="pt-2">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 border border-1 border-gray-200">
          <VisGraph
            status={status}
            data={data}
            defaultView={selectedTab.toLowerCase()}
          />
        </div>
      </div>
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
