import { axios } from "./axios";

export const setAuthorizationHeader = (token) => {
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
};
