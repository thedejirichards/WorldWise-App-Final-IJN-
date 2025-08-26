import { Link } from "react-router-dom";
import type { CityProp } from "../types/types";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }: { city: CityProp }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;
  const handleClick = (e: React.FormEvent) => {
    e.preventDefault()
    deleteCity(id)
  }
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${currentCity?.cityName === cityName ? styles["cityItem--active"] : ""}`}
      >
        <span className={styles.emoji}>
          <img
            className={styles.img}
            src={`https://flagsapi.com/${emoji}/flat/64.png`}
            alt={emoji}
          />
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
