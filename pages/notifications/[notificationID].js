import { withServerSideAuth } from "@clerk/nextjs/ssr";

export default function NotificationDetailPage({ notificationID }) {
  return (
    <div>
      <h1>Notification ID:{notificationID} Placeholder</h1>
    </div>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, resolvedUrl, params }) => {
    const { sessionId, getToken } = req.auth;
    const { notificationID } = params;

    if (!sessionId) {
      return {
        redirect: { destination: "/?redirect_url=" + resolvedUrl },
      };
    }

    const token = await getToken();

    // Retrieve the subgraph of this selected node
    /* const { status, data } = await brickgraphRequest(token)
        .get("test/node_id?node_id=" + groupID)
        .then((res) => {
          return { data: res.data, status: res.status };
        })
        .catch((err) => {
          return {
            data: err.response.data,
            status: err.response.status,
          };
        }); */

    return {
      props: { notificationID },
    };
  }
);
