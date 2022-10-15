import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { getUserById, getSessionById } from "../utils/users";
import { brickgraph } from "../services/brickgraph-api";
import { useState } from "react";
import VisGraph from "../components/visualisations/visGraph";
import ModalBase from "../components/modals/modalBase";
import {
  visData,
  visNodesDict,
} from "../components/visualisations/testData_vis";
import { UserProfile } from "@clerk/nextjs";

const clerkAPIKEY = process.env.CLERK_API_KEY;

export default function Home({ user, session, graphData, graphDataDict }) {
  // Function to fetch data from an API
  console.log(graphDataDict);
  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
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
        <button
          className="bg-giraffe-500 hover:bg-giraffe-900 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsModalVisible(true)}
        >
          Node Data
        </button>
        <br />
        {/* <button onClick={handleClick} disabled={isLoading}>
          Test Backend
        </button>
        <br /> */}
        <div id="vis" className="p-4 w-[90%] pl-4 border-2 border-rose-600">
          <VisGraph graphData={graphData} graphDataDict={graphDataDict} />
        </div>
      </div>
      {/* <div>
        {isLoading && <h2>Loading...</h2>}
        {!isLoading && (
          <div key={data.user_id}>
            <h2>{data.email}</h2>
            <h2>{data.subscription}</h2>
            <h2>{data.is_admin}</h2>
            <br />
          </div>
        )}
      </div> */}
      <div>
        <ModalBase
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        >
          <h1 className="text-2xl text-giraffe-500">Hello World</h1>
        </ModalBase>
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
    // const { data } = await brickgraph.get("/test/graph_test");
    const graphData = visData;
    const graphDataDict = visNodesDict;

    return { props: { user, session, graphData, graphDataDict } };
  }
);
