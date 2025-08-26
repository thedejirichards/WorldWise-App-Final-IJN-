/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";
import type { CitiesContextProps, CityProp, NewCityProp } from "../types/types";

const CitiesContext = createContext<CitiesContextProps | null>(null);

const BASE_URL = "http://localhost:8000";
function CitiesProvider({ children }: { children: React.ReactNode }) {
  const [cities, setCities] = useState<CityProp[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState<CityProp | null>(null)

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const resp = await fetch(`${BASE_URL}/cities`);
        const data = await resp.json();
        setCities(data);
      } catch (err) {
        console.log(`${err}: Error`);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  const getCity = async(id: string) => {
    try{
        setLoading(true)
        const res = await fetch(`${BASE_URL}/cities/${id}`)
        const data = await res.json()
        setCurrentCity(data)
    }catch(err){
        throw new Error (`Error occured ${err}`)
    }finally{
        setLoading(false)
    }
} 

  const createCity = async(newCity: NewCityProp) => {
    try{
        setLoading(true)
        const res = await fetch(`${BASE_URL}/cities`, {
          method: "POST",
          body: JSON.stringify(newCity),
          headers: {
            "Content-Type": "application/json",
          }
        })
        const data = await res.json()
        setCities((cities) => cities ? [data, ...cities] : [data])
    }catch(err){
        throw new Error (`Error creating city ${err}`)
    }finally{
        setLoading(false)
    }
}

  const deleteCity = async(id: string) => {
    try{
        setLoading(true)
        await fetch(`${BASE_URL}/cities/${id}`, {
          method: "DELETE"
        })
        setCities((cities) => cities? cities.filter(city=> city.id !== id): cities)
    }catch(err){
        throw new Error (`Error deleting city ${err}`)
    }finally{
        setLoading(false)
    }
} 

  return (
    <CitiesContext.Provider
      value={{
        cities,
        setCities,
        isLoading,
        setLoading,
        currentCity, 
        setCurrentCity,
        getCity,
        createCity,
        deleteCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext)!;
  if (!context)
    throw new Error("Cities Context was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
