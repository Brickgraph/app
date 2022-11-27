import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { brickgraphRequest } from "../../services/brickgraph-api";
import StandardTable from "../../components/visualisations/tables/standardTable";
import Router from "next/router";
import { PageTitleHeader } from "../../components/pageLayouts/titleHeader";

export default function GroupsPage({ status, data }) {
  const handleSelection = (selected) => {
    Router.push("/groups/" + selected);
  };
  return (
    <>
      <PageTitleHeader title={"Groups"} />
      <div className="px-2 md:px-4 py-2">
        <StandardTable
          data={data}
          columnHeaders={[
            { label: "Name", field: "label" },
            { label: "Group Type", field: "group" },
          ]}
          buttonAction={handleSelection}
          buttonText="View"
        />
      </div>
    </>
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
    const nodeLabels = ["Organisation", "UserGroup"];

    const labels = `${nodeLabels}`;
    const { status, data } = await brickgraphRequest(token)
      .get("nodes", {
        params: {
          labels: labels,
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
      props: { status, data },
    };
  }
);
