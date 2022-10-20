import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { getUserById } from "../utils/users";
import { brickgraph, brickgraphRequest } from "../services/brickgraph-api";
import VisGraph from "../components/visualisations/graph/visGraph";
import { setAuthorizationHeader } from "../services/auth";

export default function Home({ user, status, data, testGraphData }) {
  console.log("TEST", testGraphData);
  return (
    <>
      <div>
        <div className="p-4 h-[100%] w-[100%] flex items-center">
          <VisGraph status={status} data={data.graph} />
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
    const { status, data } = await brickgraphRequest(token).get(
      "test/graph_test"
    );
    const testResponse = await brickgraphRequest(token).get("test");
    const testGraphData = testResponse.data;

    return { props: { user, status, data, testGraphData } };
  }
);
