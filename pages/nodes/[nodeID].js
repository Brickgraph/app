import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { brickgraphRequest } from "../../services/brickgraph-api";
import { VisGraph } from "../../components/visualisations/graph/VisGraph";
import Router from "next/router";

export default function NodePage({ nodeID, status, data }) {
  console.log(data);
  if (data.nodes.length === 0 || status !== 200) {
    Router.push("/");
    return (
      <div>
        Nothing to see here. Redirecting you back to the main page now...
      </div>
    );
  }
  return (
    <>
      <div>
        <h1 className="text-2xl justify-center">{data.nodes[0].label}</h1>
      </div>
      <div>
        <VisGraph status={status} data={data} defaultView={"graph"} />
      </div>
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
      .get("test/node?node_id=" + nodeID)
      .then((res) => {
        return { data: res.data, status: res.status };
      })
      .catch((err) => {
        return {
          data: err.response.data,
          status: err.response.status,
        };
      });

    return { props: { nodeID, status, data } };
  }
);
