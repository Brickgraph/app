import { UserProfile } from "@clerk/nextjs";
import { getUserById } from "../utils/users";

export default function ProfilePage() {
  return (
    <div>
      <UserProfile />
    </div>
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

    return { props: { user } };
  }
);
