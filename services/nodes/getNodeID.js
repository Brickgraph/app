// Retrieve the details of node, given nodeID
import { brickgraphRequest } from "../../services/brickgraph-api";

export const getNodeDetails = async (nodeID, token) => {
  const { status, data } = await brickgraphRequest(token)
    .get("nodes/" + nodeID)
    .then((res) => {
      return { data: res.data, status: res.status };
    })
    .catch((err) => {
      return {
        data: err.response.data,
        status: err.response.status,
      };
    });

  const { accessStatus, accessData } = await brickgraphRequest(token)
    .get(`nodes/${nodeID}/permission`)
    .then((res) => {
      return { accessData: res.data, accessStatus: res.status };
    })
    .catch((err) => {
      return {
        accessData: err.response.data,
        accessStatus: err.response.status,
      };
    });
  return { status, data, accessStatus, accessData };
};
