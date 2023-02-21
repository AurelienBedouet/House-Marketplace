"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const popupIcon = L.icon({
  iconUrl: "/map-marker-icon.png",
  iconSize: [32, 43],
});

type Props = {
  address: string;
  location: string;
  lat: number;
  lng: number;
};

const ListingMap = ({ address, location, lat, lng }: Props) => {
  return (
    <div className="w-full h-[360px] overflow-x-hidden mb-12 lg:h-[480px] rounded-xl shadow-xl">
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[lat, lng]} icon={popupIcon}>
          <Popup>{location ?? address}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default ListingMap;
