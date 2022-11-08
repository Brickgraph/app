import Axios from "axios";

//const { getToken } = useSession().session;

export const brickgraph = Axios.create({
  headers: { "Content-Type": "application/json" },
  authorization: "",
  baseURL: "http://127.0.0.1:8000",
});

export function brickgraphRequest(token) {
  const request = Axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    authorization: "",
    baseURL: "http://127.0.0.1:8000",
  });
  return request;
}
