import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { getUserById, getSessionById } from "../utils/users";
import { brickgraph } from "../services/brickgraph-api";
import { useState } from "react";
import VisGraph from "../components/visualisations/visGraph";

const clerkAPIKEY = process.env.CLERK_API_KEY;

export default function Home({ user, session, graphData }) {
  // Function to fetch data from an API
  console.log(graphData);
  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
    const response = await brickgraph.get("/auth/test");
    console.log(response);
    setData(response.data);
    setIsLoading(false);
  };

  return (
    <>
      <div>
        <span className="text-3xl">Hello {user.first_name}</span>
        <br />
        <button onClick={handleClick} disabled={isLoading}>
          Test Backend
        </button>
        <br />
        <div id="vis" className="h-auto border-2 border-rose-600">
          <VisGraph graphData={graphData} />
        </div>
      </div>
      <div>
        {isLoading && <h2>Loading...</h2>}
        {!isLoading && (
          <div key={data.user_id}>
            <h2>{data.email}</h2>
            <h2>{data.subscription}</h2>
            <h2>{data.is_admin}</h2>
            <br />
          </div>
        )}
      </div>
    </>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, resolvedUrl }) => {
    const { userId, sessionId } = req.auth;

    if (!sessionId) {
      return {
        redirect: { destination: "/sign-in?redirect_url=" + resolvedUrl },
      };
    }

    const user = await getUserById(userId);
    const session = await getSessionById(sessionId);
    const { data } = await brickgraph.get("/test/graph_test");
    const graphData = data;

    return { props: { user, session, graphData } };
  }
);
