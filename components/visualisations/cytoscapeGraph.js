import React from "react";
// import ReactDOM from "react-dom";
import cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import cola from "cytoscape-cola";

cytoscape.use(cola);

export const CytoscapeGraph = () => {
  const elements = [
    { data: { id: "a" } },
    { data: { id: "b" } },
    { data: { id: "ab", source: "a", target: "b" } },
    { data: { id: "d" } },
    { data: { id: "e" } },
    { data: { id: "de", source: "d", target: "e" } },
    { data: { id: "a" } },
    { data: { id: "d" } },
    { data: { id: "ad", source: "a", target: "d" } },
    { data: { id: "e" } },
    { data: { id: "b" } },
    { data: { id: "eb", source: "e", target: "b" } },
  ];
  const layout = { name: "cola", rows: 1 };
  const style = [
    {
      selector: "node",
      style: {
        "background-color": "#666",
        label: "data(id)",
      },
    },
    {
      selector: "edge",
      style: {
        width: 3,
        "line-color": "#ccc",
        "target-arrow-color": "#ccc",
        "target-arrow-shape": "triangle",
      },
    },
  ];
  return (
    <>
      <CytoscapeComponent
        elements={elements}
        style={{ width: "400px", height: "400px" }}
        layout={layout}
        stylesheet={style}
        cy={(cy) => {
          cy.on("tap", "node", (evt) => {
            const node = evt.target;
            console.log("tapped " + node.id());
          });
        }}
      />
      <script type="module" src="index.js"></script>
    </>
  );
};
