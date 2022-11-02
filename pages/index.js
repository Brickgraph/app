import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { getUserById } from "../utils/users";
import { brickgraphRequest } from "../services/brickgraph-api";
import { VisGraph } from "../components/visualisations/graph/visGraph";
import ComboBox from "../components/forms/inputs/comboBox";

export default function Home({ user, status, data }) {
  const options = [
    { id: 1, label: "Property", value: "Property" },
    { id: 2, label: "Sector", value: "Sector" },
    { id: 3, label: "Organisation", value: "Organisation" },
    { id: 4, label: "Property Unit", value: "PropertyUnit" },
    { id: 5, label: "Users", value: "Users" },
  ];

  return (
    <>
      <div className="flex flex-col p-4 overflow-auto">
        <div className="z-20">
          <ComboBox options={options} />
        </div>
        <VisGraph status={status} data={data} />
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
      "test/subgraph"
    );

    return { props: { user, status, data } };
  }
);
