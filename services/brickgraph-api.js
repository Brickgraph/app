import Axios from "axios";
import Qs from "qs";

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
    paramsSerializer: (params) =>
      Qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return request;
}
