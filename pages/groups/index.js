import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { brickgraphRequest } from "../../services/brickgraph-api";

export default function GroupsPage({ response, nodeLabels }) {
  console.log(response);
  console.log(nodeLabels);
  return (
    <div>
      <h1>Groups Page Placeholder</h1>
    </div>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, resolvedUrl }) => {
    const { sessionId, getToken } = req.auth;

    if (!sessionId) {
      return {
        redirect: { destination: "/?redirect_url=" + resolvedUrl },
      };
    }

    //const user = await getUserById(userId);
    const token = await getToken();

    // Retrieve the subgraph of this selected node
    const nodeLabels = JSON.parse(
      JSON.stringify(["Organisation", "UserGroup"])
    );
    const response = await brickgraphRequest(token)
      .get("test/node_labels", {
        params: {
          node_labels: nodeLabels,
          order_by: "name",
          limit: 20,
          offset: 0,
        },
      })
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
      props: { response, nodeLabels },
    };
  }
);
