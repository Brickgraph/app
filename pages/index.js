import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { getUserById, getSessionById } from "../utils/users";

const clerkAPIKEY = process.env.CLERK_API_KEY;

export default function Home({ user, session }) {
  return (
    <div>
      <span className="text-3xl">Hello {user.first_name}</span>
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
    const session = await getSessionById(sessionId);

    return { props: { user, session } };
  }
);
