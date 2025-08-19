import { useCities } from "../contexts/CitiesContext";
import type { CityProp, CountryProp } from "../types/types";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
function CountriesList() {
  const {cities, isLoading} = useCities()
  const countries = cities?.reduce((acc: CountryProp[], curr: CityProp) => {
    if (!acc.map((ele) => ele.country).includes(curr.country))
      return [
        ...acc,
        { country: curr.country, emoji: curr.emoji, id: curr.id },
      ];
    else return acc;
  }, []);
  if (isLoading) return <Spinner />;
  if (!cities?.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.countryList}>
      {countries?.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountriesList;
