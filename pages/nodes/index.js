import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { brickgraphRequest } from "../../services/brickgraph-api";
import StandardTable from "../../components/visualisations/tables/standardTable";
import Router from "next/router";

export default function NodesPage({ status, data, label }) {
  const handleSelection = (selected) => {
    console.log(selected);
    Router.push("/nodes/" + selected);
  };

  if (status !== 200) {
    Router.push("/");
  }

  return (
    <>
      <div>
        <h1>{label}</h1>
      </div>
      <div className="p-4">
        <StandardTable
          data={data}
          columnHeaders={["Label", "Type"]}
          editAction={handleSelection}
        />
      </div>
    </>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, resolvedUrl, query }) => {
    const { sessionId, getToken } = req.auth;

    if (!sessionId) {
      return {
        redirect: { destination: "/?redirect_url=" + resolvedUrl },
      };
    }

    //const user = await getUserById(userId);
    const token = await getToken();
    const { label } = query;

    const { status, data } = await brickgraphRequest(token)
      .get("test/node_labels", {
        params: {
          labels: label,
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
      props: { status, data, label },
    };
  }
);
