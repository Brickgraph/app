import { userAgent } from "next/server";

import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { getUserById } from "../../utils/users";

export default function ProfilePage({ user }) {
  return (
    <>
      <div className="p-5">
        <h1 className="text-bold text-orange-500 text-3xl">
          This is your profile page {user.first_name}
        </h1>
      </div>
    </>
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
