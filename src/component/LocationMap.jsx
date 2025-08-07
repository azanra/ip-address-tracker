import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

const DEFAULT_ZOOM = 13;

const LocationMap = ({ data }) => {
  const { location } = data;
  const { lat, lng } = location;
  return (
    <div>
      <MapContainer
        center={[lat, lng]}
        zoom={DEFAULT_ZOOM}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <RecenterAutomatically lat={lat} lng={lng} />
      </MapContainer>
    </div>
  );
};

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], DEFAULT_ZOOM);
    console.log("New coordinate!");
  }, [lat, lng, map]);
};

export default LocationMap;
