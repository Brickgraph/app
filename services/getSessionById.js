import Axios from "axios";

export const clerkSessionRequest = (sessionId) => {
  const clerkToken = process.env.NEXT_PUBLIC_CLERK_API_KEY;
  const request = Axios.get(`https://api.clerk.dev/v1/sessions/${sessionId}`, {
    headers: {
      Authorization: `Bearer ${clerkToken}`,
      "Content-Type": "application/json",
    },
    authorization: "",
  });
  return request;
};
