import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { brickgraphRequest } from "../services/brickgraph-api";
import { VisGraph } from "../components/visualisations/graph/VisGraph";

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
    const { sessionId, getToken } = req.auth;

    if (!sessionId) {
      return {
        redirect: { destination: "/sign-in?redirect_url=" + resolvedUrl },
      };
    }

    const token = await getToken();
    const { status, data } = await brickgraphRequest(token).get(
      "test/subgraph"
    );

    return { props: { status, data } };
  }
);
