import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { brickgraphRequest } from "../../services/brickgraph-api";
import StandardTable from "../../components/visualisations/tables/standardTable";
import Router from "next/router";
import EmptyEntityState from "../../components/ui/empty/emptyState";
import { PageTitleHeader } from "../../components/pageLayouts/titleHeader";

export default function NodesPage({ status, data, label }) {
  const handleSelection = (selected) => {
    Router.push("/nodes/" + selected);
  };

  if (status !== 200) {
    Router.push("/");
  }

  const createNewItem = () => {
    Router.push("/create?label=" + label);
  };

  if (data.length === 0) {
    return (
      <>
        <div className="p-2 md:p-8 border-dotted border-2 border-orange-400">
          <EmptyEntityState
            itemName={label}
            description={`Nothing here. Shall we create a new ${label}?`}
            createAction={createNewItem}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <PageTitleHeader title={label} />
      <div className="p-4">
        <StandardTable
          data={data}
          columnHeaders={[
            { label: "Label", field: "label" },
            { label: "Type", field: "group" },
          ]}
          buttonAction={handleSelection}
          sort={true}
          sortBy="name"
          buttonText="Details"
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
        redirect: { destination: "/sign-in" },
      };
    }

    const token = await getToken();

    const label = query?.label ? query.label : "";

    const { status, data } = await brickgraphRequest(token)
      .get("nodes/", {
        params: {
          labels: label,
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
      props: { status, data, label: `${label}` },
    };
  }
);
