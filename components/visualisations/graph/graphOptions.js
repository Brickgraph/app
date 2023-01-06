export const graphOptions = ({ hierarchical = false }) => {
  return {
    layout: {
      hierarchical: hierarchical,
    },
    nodes: {
      shape: "circle",
      size: 12,
      scaling: {
        min: 20,
        max: 20,
        label: { enabled: false },
      },
      widthConstraint: 100,
    },
    edges: {
      color: "orange",
      physics: false,
      font: {
        size: 10,
      },
      shadow: { enabled: false, size: 3 },
      smooth: { enabled: false },
    },
    interaction: {
      hover: true,
      navigationButtons: true,
      hoverConnectedEdges: true,
      hideEdgesOnDrag: false,
      hideNodesOnDrag: false,
      selectConnectedEdges: false,
    },
    physics: {
      forceAtlas2Based: {
        gravitationalConstant: -40,
        centralGravity: 0.003,
        springLength: 1,
        springConstant: 1000,
        avoidOverlap: 1.2,
      },
      maxVelocity: 250,
      solver: "forceAtlas2Based",
      timestep: 0.35,
      stabilization: {
        enabled: true,
        iterations: 1000,
        updateInterval: 25,
      },
    },
  };
};
