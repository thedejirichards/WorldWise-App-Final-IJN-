// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

function Form() {
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState("");
  const [mapLat, mapLng] = useUrlPosition();
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState<boolean>(false);
  const [geoCodingError, setGeoCodingError] = useState<string>("");
  const [countrySrcImg, setCountrySrcImg] = useState("jkl");
  const [emoji, setEmoji] = useState<string>("")
  const {createCity, isLoading} = useCities()
  const navigate = useNavigate()
  useEffect(() => {
    if (!mapLat && !mapLng) return;
    const fetchCityData = async () => {
      try {
        setIsLoadingGeoCoding(true);
        setGeoCodingError("");
        const res = await fetch(
          `${BASE_URL}latitude=${mapLat}&longitude=${mapLng}`
        );
        const data = await res.json();
        console.log(data)
        if (!data.countryName)
          throw new Error(
            "That doesn't seem like a city. Click somewhere else 😉"
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
        setEmoji(data.countryCode || "")
        setCountrySrcImg(
          `https://flagsapi.com/${data.countryCode}/flat/64.png`
        );
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching city data:", err.message);
          setGeoCodingError(err.message);
        }
      } finally {
        setIsLoadingGeoCoding(false);
      }
    };
    fetchCityData();
  }, [mapLat, mapLng]);
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!cityName || !date) return
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat: mapLat, lng: mapLng }
    }
    await createCity(newCity)
    navigate("/app/cities")
  };
  // console.log(country)
  if (geoCodingError) return <Message message={geoCodingError} />;
  if (!mapLat && !mapLng)
    return <Message message="Start by clicking on the map" />;
  return isLoadingGeoCoding ? (
    <Spinner />
  ) : (
    <form className={`${styles.form} ${isLoading ? styles.loading: ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          className={styles.flagParentInput}
        />
        <span className={styles.flag}>
          {mapLat && mapLng && (
            <img src={countrySrcImg} alt="country" className={styles.img} />
          )}
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
          id="date"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
