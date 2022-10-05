import { UserProfile } from "@clerk/nextjs";
import { withServerSideAuth } from "@clerk/nextjs/ssr";

export default function ProfilePage() {
  return (
    <div>
      <UserProfile />
    </div>
  );
}

export const getServerSideProps = withServerSideAuth(
  async ({ req, resolvedUrl }) => {
    const { sessionId } = req.auth;

    if (!sessionId) {
      return {
        redirect: { destination: "/sign-in?redirect_url=" + resolvedUrl },
      };
    }

    return { props: {} };
  }
);
