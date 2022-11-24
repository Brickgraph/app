import { UserProfile } from "@clerk/nextjs";
import { withServerSideAuth } from "@clerk/nextjs/ssr";

export default function ProfilePage() {
  return (
    <div className="relative mx-auto max-w-4xl md:px-4">
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
