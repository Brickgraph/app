import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { getUserById } from "../utils/users";
import { brickgraphRequest } from "../services/brickgraph-api";
import { VisGraph } from "../components/visualisations/graph/VisGraph";
import CommandPalette from "../components/layout/search/commandPalette";
import { useState } from "react";

export default function Home({ user, status, data }) {
  const [paletteOpen, setPaletteOpen] = useState(true);
  console.log(paletteOpen);
  const handlePalette = () => {
    setPaletteOpen((current) => !current);
  };
  return (
    <>
      <button onClick={handlePalette}>Open Palette</button>
      <CommandPalette isOpen={paletteOpen} onClose={handlePalette} />
      <div className="flex flex-col p-4 overflow-auto">
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
