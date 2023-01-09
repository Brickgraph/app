import React from "react";
import { useState } from "react";
import GoogleMapReact from "google-map-react";
import { useNodeStore } from "../../../services/stores/nodeStore";
import { NodeDetailsModal } from "../../modals/nodeDetails";

const MapMarker = ({ text, MarkerIcon, onClickAction = null }) => (
  <div className="flex items-center justify-center">
    <button
      onClick={onClickAction}
      className="p-1 border border-2 border-orange-200 rounded bg-orange-400 text-white"
    >
      {/* <p className="text-xs">{text}</p> */}
      <div className="h-3 w-3">
        <MarkerIcon />
      </div>
    </button>
  </div>
);

const MapOptions = (maps) => {
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.TOP_LEFT,
      style: maps.ZoomControlStyle.SMALL,
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT,
    },
    mapTypeId: "hybrid",
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    hover: true,
    mapId: process.env.NEXT_PUBLIC_GOOGLE_DEFAULT_MAP_ID,
  };
};

export default function GoogleMap({
  markers,
  center = { lat: 51.4769, lng: -0.09 },
  zoom = 11,
}) {
  const [nodeId, setNodeId] = useState(null);
  const [nodeModalVisible, setNodeModalVisible] = useState(false);
  const { nodes: nodesInStore } = useNodeStore();

  const handleMarkerClick = (marker) => {
    setNodeId(marker.id);
    setNodeModalVisible(true);
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}` }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={MapOptions}
      >
        {markers.map((marker) => (
          <MapMarker
            key={marker.id}
            lat={marker.latitude}
            lng={marker.longitude}
            text={marker.label}
            MarkerIcon={marker.icon}
            onClickAction={() => {
              handleMarkerClick(marker);
            }}
          />
        ))}
      </GoogleMapReact>
      <NodeDetailsModal
        nodeId={nodeId ? nodeId : null}
        show={nodeModalVisible}
        onClose={() => {
          setNodeId(null);
          setNodeModalVisible(false);
        }}
      />
    </div>
  );
}
