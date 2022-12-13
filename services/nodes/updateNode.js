import { brickgraphRequest } from "../brickgraph-api";

export async function updateNode({
  token,
  nodeId,
  body,
  loading = false,
  success = false,
}) {
  const { status, data } = await brickgraphRequest(token)
    .put(`nodes/${nodeId}/update/`, body)
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
    console.log("Success", status);
  }
  () => loading(false);

  return { status, data };
}
