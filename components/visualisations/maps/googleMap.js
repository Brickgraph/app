import React from "react";
import GoogleMapReact from "google-map-react";

const MapMarker = ({ text, MarkerIcon, onClickAction = null }) => (
  <div className="flex items-center justify-center">
    <button
      onClick={onClickAction}
      className="p-2 border border-2 border-orange-200 rounded bg-orange-400 text-white"
    >
      <h1 className="text-xs">{text}</h1>
      <div className="h-5 w-5">
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
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    hover: true,
  };
};

export default function GoogleMap({
  markers,
  center = { lat: 51.4769, lng: -0.09 },
  zoom = 11,
  selectedMarker = null,
}) {
  const handleMarkerClick = (markerId) => {
    selectedMarker(markerId);
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
            lat={marker.lat}
            lng={marker.lng}
            text={marker.label}
            MarkerIcon={marker.icon}
            onClickAction={() => {
              handleMarkerClick(marker);
            }}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
