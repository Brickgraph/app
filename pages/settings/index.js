import { withServerSideAuth } from "@clerk/nextjs/ssr";

export default function SettingsPage({ query }) {
  console.log(query.type);
  return (
    <div>
      <h1>Setting Page Placeholder</h1>
    </div>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, resolvedUrl, query }) => {
    const { sessionId, getToken } = req.auth;

    //const { query } = context.query;
    console.log("QUERY", query);
    if (!sessionId) {
      return {
        redirect: { destination: "/?redirect_url=" + resolvedUrl },
      };
    }

    return {
      props: { query },
    };
  }
);
