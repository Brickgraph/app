import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { getUserById } from "../utils/users";
import { brickgraphRequest } from "../services/brickgraph-api";
import VisGraph from "../components/visualisations/graph/visGraph";

export default function Home({ user, status, data }) {
  return (
    <>
      <VisGraph status={status} data={data} />
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
    const { status, data } = await brickgraphRequest(token).get("test");
    //const testResponse = await brickgraphRequest(token).get("test");
    //const testGraphStatus = testResponse.status;
    //const testGraphData = testResponse.data;

    return { props: { user, status, data } };
  }
);
