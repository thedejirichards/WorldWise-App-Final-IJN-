import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useState } from "react";
import { useCities } from "../contexts/CitiesContext";
function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState<number[]>([40, 0]);
  const navigate = useNavigate();
  const { cities } = useCities();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        // center={[mapLat, mapLng]}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities?.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>
                <img
                  src={`https://flagsapi.com/${city.emoji}/shiny/64.png`}
                  alt={city.emoji}
                />
              </span>
              <span className="span">{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={[mapLat ||"0", mapLng || "0"]}/>
      </MapContainer>
    </div>
  );
}

function ChangeCenter ({position}: {position: string[]}){
    const map = useMap()
    map.setView(position)
    return null
}

export default Map;
