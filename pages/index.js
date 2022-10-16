import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { getUserById, getSessionById } from "../utils/users";
import { brickgraph } from "../services/brickgraph-api";
import { useState } from "react";
import VisGraph from "../components/visualisations/graph/visGraph";
import { visData } from "../components/visualisations/graph/testData_vis";
import { setAuthorizationHeader } from "../services/auth";

export default function Home({ user, backendStatus, backendData }) {
  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
    const response = await testBackend();
    if (response.status === 200) {
      setData(response.data);
      console.log("SUCCESS", response.data);
      setIsLoading(false);
    }
    console.log(response.status);
  };

  return (
    <>
      <div>
        <span className="text-md md: text-lg xl:text-3xl">
          Hello {user.first_name}
        </span>
        <br />
        <button onClick={handleClick}>Test</button>
        <br />
        {/* <div id="vis" className="p-4 w-[90%] pl-4 border-2 border-rose-600">
          <VisGraph graphData={graphData} />
        </div> */}
        <div className="p-4 w-[90%] pl-4 border-2 border-orange-500">
          <VisGraph status={backendStatus} data={backendData.graph} />
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
    //const graphData = visData;

    // Backend data to populate graph
    setAuthorizationHeader(token);
    const backendResponse = await brickgraph.get("test/graph_test");
    const backendStatus = backendResponse.status;
    const backendData = backendResponse.data;

    return { props: { user, backendStatus, backendData } };
  }
);
