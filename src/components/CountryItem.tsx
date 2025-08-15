import type { CountryItemProp } from "../types/types";
import styles from "./CountryItem.module.css";

function CountryItem({ country }: CountryItemProp) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
