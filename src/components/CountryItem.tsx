import type { CountryItemProp } from "../types/types";
import styles from "./CountryItem.module.css";

function CountryItem({ country }: CountryItemProp) {
  return (
    <li className={styles.countryItem}>
      <span>
        <img
          src={`https://flagsapi.com/${country.emoji}/flat/64.png`}
          alt={`${country.emoji}`}
        />
      </span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
