import { axios } from "../services/axios";

const clerkAPIKEY = process.env.CLERK_API_KEY;

export async function getUserById(userId) {
  const res = await axios.get(`https://api.clerk.dev/v1/users/${userId}`, {
    headers: { Authorization: `Bearer ${clerkAPIKEY}` },
  });

  const user = res.data;

  return user;
}

export async function getSessionById(sessionId) {
  const res = await axios.get(
    `https://api.clerk.dev/v1/sessions/${sessionId}`,
    {
      headers: { Authorization: `Bearer ${clerkAPIKEY}` },
    }
  );

  const session = res.data;

  return session;
}
