import { brickgraphRequest } from "../brickgraph-api";

export const updateNode = async ({
  token,
  nodeId,
  dataToUpdate,
  loading = false,
  success = false,
}) => {
  console.log(nodeId, dataToUpdate);
  const { status, data } = await brickgraphRequest(token)
    .put(`nodes/${nodeId}/update/`, dataToUpdate)
    .then((res) => {
      return { data: res.data, status: res.status };
    })
    .catch((err) => {
      return {
        data: err.response.data,
        status: err.response.status,
      };
    });
  if (status === 201) {
    () => success(true);
    console.log(data);
  }
  () => loading(false);
  console.log(data);

  return { status, data };
};
