import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";

const icon = L.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
});

const DEFAULT_ZOOM = 30;

const LocationMap = ({ data }) => {
  const { location } = data;
  const { lat, lng } = location;
  return (
    <div>
      <MapContainer
        center={[lat, lng]}
        zoom={DEFAULT_ZOOM}
        style={{ height: "650px", width: "100%", borderRadius: "8px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={icon}>
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
  /*  
    map is stable tested with useEffect even though it is object (https://stackoverflow.com/questions/69861840/how-to-detect-a-variable-change-in-react-js-solidity)
    it should rerun only when lat and lng changes 
  */
  useEffect(() => {
    map.setView([lat, lng], DEFAULT_ZOOM);
    console.log("New coordinate!");

    return () => console.log("Cleaning up coordinate");
  }, [lat, lng, map]);
};

export default LocationMap;
