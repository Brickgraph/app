import Axios from "axios";

export const brickgraph = Axios.create({
  headers: { "Content-Type": "application/json" },
  authorization: "",
  baseURL: process.env.BRICKGRAPH_API_URL,
});
