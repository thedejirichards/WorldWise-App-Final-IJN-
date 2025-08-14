import type { CityProp } from "../types/types";
import styles from "./CityItem.module.css";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }: { city: CityProp }) {
  const { cityName, emoji, date } = city;
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>
        <img
          className={styles.img}
          src={`https://flagsapi.com/${emoji}/flat/64.png`}
          alt={emoji}
        />
      </span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
