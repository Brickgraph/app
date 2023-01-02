/* import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";
import { Map } from "react-map-gl";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";

// Set mapbox token here
const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -1.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 50,
  bearing: 0,
};

// Data to be used by the LineLayer
const data = [
  {
    sourcePosition: [-122.41669, 37.7853],
    targetPosition: [-122.41669, 37.781],
  },
];

export const MapboxMap = () => {
  const layers = [new LineLayer({ id: "line-layer", data })];

  return (
    <div className="relative flex h-72 w-72" id="mapcontainer">
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
      />
    </div>
  );
}; */
