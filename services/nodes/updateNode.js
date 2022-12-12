import { brickgraphRequest } from "../brickgraph-api";

export async function updateNode({
  session,
  nodeId,
  body,
  loading = false,
  success = false,
}) {
  const { getToken } = session;
  const token = await getToken();

  console.log(nodeId, body);
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
    console.log(data);
  }
  () => loading(false);
  console.log(data);

  return { status, data };
}
