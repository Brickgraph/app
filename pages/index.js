import { UserButton, useUser } from "@clerk/clerk-react";
import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { axios } from "../services/axios";
import { getUserById } from "../utils/users";

const clerkAPIKEY = process.env.CLERK_API_KEY;

export default function Home({ user }) {
  return (
    <div>
      <h1 className="underline">Clerk + NextJS App</h1>
      <span className="text-3xl">Hello {user.first_name}</span>
      <UserButton />
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
