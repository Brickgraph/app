import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import data from "./testData";

export const ForceGraph = ({ height, width }) => {
  const fgRef = useRef();
  const ForceGraph2D = dynamic(() => import("react-force-graph-2d"));
  return (
    <>
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        nodeLabel="id"
        height={height}
        width={width}
        backgroundColor="lightgrey"
      />
    </>
  );
};
