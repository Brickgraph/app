import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { getUserById } from "../utils/users";
import { brickgraphRequest } from "../services/brickgraph-api";
import { VisGraph } from "../components/visualisations/graph/VisGraph";
import FilterMenu from "../components/modals/filterMenu";
import { useState } from "react";

export default function Home({ user, status, data }) {
  const [filterMenu, setFilterMenu] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterMenu = () => {
    setFilterMenu((current) => !current);
    console.log(selectedFilters);
  };

  return (
    <>
      <div className="flex flex-col p-4 overflow-auto">
        <FilterMenu
          isOpen={filterMenu}
          handleClose={handleFilterMenu}
          handleNodeSelections={setSelectedFilters}
          currentSelections={selectedFilters}
        />
        <VisGraph
          status={status}
          data={data}
          nodeSelections={selectedFilters}
          filterClear={() => setSelectedFilters([])}
          openFilterMenu={handleFilterMenu}
        />
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
