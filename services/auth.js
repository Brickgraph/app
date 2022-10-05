import { axios } from "./axios";
import { brickgraph } from "./brickgraph-api";

export const setAuthorizationHeader = (token) => {
  brickgraph.defaults.headers["Authorization"] = `Bearer ${token}`;
};
