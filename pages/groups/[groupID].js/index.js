import { GroupPageLayout } from "../../../components/layout/groupPage/layout";

export default function GroupPage({ status, data }) {
  const [tabSelected, setTabSelected] = useState("Details");
  const section = () => {
    switch (tabSelected) {
      case "Details":
        return <div>{data.label} Details</div>;
      case "Permissions":
        return <div>{data.label} Permissions</div>;
      default:
        return <div>Details</div>;
    }
  };
  if (status !== 200) {
    Router.push("/");
    return (
      <div>
        Nothing to see here. Redirecting you back to the main page now...
      </div>
    );
  }
  return (
    <>
      <GroupPageLayout
        data={data}
        selectedTab={tabSelected}
        handleSection={setTabSelected}
      >
        {section()}
      </GroupPageLayout>
    </>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, resolvedUrl, params }) => {
    const { sessionId, getToken } = req.auth;
    const { groupID } = params;

    if (!sessionId) {
      return {
        redirect: { destination: "/?redirect_url=" + resolvedUrl },
      };
    }

    //const user = await getUserById(userId);
    const token = await getToken();

    // Retrieve the subgraph of this selected node
    const { status, data } = await brickgraphRequest(token)
      .get("test/group_id?group_id=" + groupID)
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
