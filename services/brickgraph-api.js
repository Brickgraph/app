import Axios from "axios";

export const brickgraph = Axios.create({
  headers: { "Content-Type": "application/json" },
  authorization: "",
  baseURL: "http://127.0.0.1:8000",
});

export function brickgraphRequest(token) {
  const headers = { Authorization: `Bearer ${token}` };
  return Axios.create({
    headers: { "Content-Type": "application/json" },
    authorization: "",
    baseURL: "http://127.0.0.1:8000",
  });
}
