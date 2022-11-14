import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { getUserById } from "../utils/users";
import { brickgraphRequest } from "../services/brickgraph-api";
import { VisGraph } from "../components/visualisations/graph/VisGraph";
import CommandPalette from "../components/layout/search/commandPalette";
import { useState, useCallback, useEffect } from "react";

export default function Home({ status, data }) {
  return (
    <>
      <div className="flex flex-col p-4 overflow-auto">
        <VisGraph status={status} data={data} defaultView={"table"} />
      </div>
    </>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, resolvedUrl }) => {
    const { userId, sessionId, getToken } = req.auth;

    if (!sessionId) {
      return {
        redirect: { destination: "/?redirect_url=" + resolvedUrl },
      };
    }

    const token = await getToken();

    // Backend data to populate graph
    const { status, data } = await brickgraphRequest(token).get(
      "test/subgraph"
    );

    return { props: { status, data } };
  }
);
