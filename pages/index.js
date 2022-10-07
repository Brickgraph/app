import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { getUserById, getSessionById } from "../utils/users";
import { brickgraph } from "../services/brickgraph-api";
import { useState } from "react";

const clerkAPIKEY = process.env.CLERK_API_KEY;

export default function Home({ user, session }) {
  // Function to fetch data from an API
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

    return { props: { user, session } };
  }
);
