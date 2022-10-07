import Axios from "axios";

export const brickgraph = Axios.create({
  headers: { "Content-Type": "application/json" },
  authorization: "",
  baseURL: "http://127.0.0.1:8000",
});
