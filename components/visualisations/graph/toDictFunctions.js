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
/* export function visNodesDictFunc(data) {
return data.reduce((acc, node) => {
    acc[node.id] = node;
    return acc;
}, {});
} */
