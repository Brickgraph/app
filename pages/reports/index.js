import { withServerSideAuth } from "@clerk/nextjs/ssr";

export default function ReportsPage() {
  return (
    <div>
      <h1>Reports Page Placeholder</h1>
    </div>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, resolvedUrl }) => {
    const { sessionId, getToken } = req.auth;

    return {
      redirect: { destination: "/" },
    };

    /* const token = await getToken();
    const { status, data } = await brickgraphRequest(token).get("subgraph");

    return { props: { token, status, data } }; */
  }
);
