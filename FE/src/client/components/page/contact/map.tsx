import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      const map = L.map(mapRef.current).setView([21.027764, 105.83416], 13);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add a marker
      const marker = L.marker([21.027764, 105.83416]).addTo(map);
      marker.bindPopup("Ha Noi, Viet Nam");

      // Add a bounding box
      const bounds = [
        [20.9, 105.6],
        [21.1, 106.0],
      ];
      //   const rectangle = L.rectangle(bounds, {
      //     color: "blue",
      //     weight: 2,
      //     opacity: 0.5,
      //   }).addTo(map);

      mapInstanceRef.current = map;
    }
  }, [mapRef]);

  return <div ref={mapRef} style={{ width: "100%", height: "50vh" }} />;
};

export default Map;
