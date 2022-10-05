import Axios from "axios";

export const brickgraph = Axios.create({
  headers: { "Content-Type": "application/json" },
  authorization: "",
  baseURL: "",
});
