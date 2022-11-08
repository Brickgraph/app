export function nodesDictFunc(data) {
  if (data.nodes === null) {
    return null;
  }
  const nodesDict = data.nodes.reduce((acc, node) => {
    acc[node.id] = node;
    return acc;
  }, {});
  return nodesDict;
}

// Need to build similar function for Edge data
export function edgesDictFunc(data) {
  if (data.edges === null) {
    return null;
  }

  const edgeDict = data.edges.reduce((acc, edge) => {
    acc[edge.id] = edge;
    return acc;
  }, {});
  return edgeDict;
}
