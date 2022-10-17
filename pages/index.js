import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { getUserById, getSessionById } from "../utils/users";
import { brickgraph } from "../services/brickgraph-api";
import { useState } from "react";
import VisGraph from "../components/visualisations/graph/visGraph";
import { setAuthorizationHeader } from "../services/auth";

export default function Home({ user, backendStatus, backendData }) {
  return (
    <>
      <div>
        <div className="p-4 h-[100%] w-[100%] flex items-center">
          <VisGraph status={backendStatus} data={backendData.graph} />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, resolvedUrl }) => {
    const { userId, sessionId, getToken } = req.auth;

    if (!sessionId) {
      return {
        redirect: { destination: "/sign-in?redirect_url=" + resolvedUrl },
      };
    }

    const user = await getUserById(userId);
    const token = await getToken();

    // Backend data to populate graph
    setAuthorizationHeader(token);
    const backendResponse = await brickgraph.get("test/graph_test");
    const backendStatus = backendResponse.status;
    const backendData = backendResponse.data;

    return { props: { user, backendStatus, backendData } };
  }
);
