/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import type { CitiesActionProp, CitiesContextProps, CitiesStateProp, CityProp, NewCityProp } from "../types/types";

const CitiesContext = createContext<CitiesContextProps | null>(null);

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: "",
};
function reducer(state: CitiesStateProp, action: CitiesActionProp) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payLoad,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payLoad
      }
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities:   [action.payload, ...state.cities],
        currentCity: action.payload
      }
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities:   state.cities.filter((city:CityProp) => city.id !== action.payload),
        currentCity: null
      }
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    default:
      throw new Error("unknown action type");
  }
}

const BASE_URL = "http://localhost:8000";
function CitiesProvider({ children }: { children: React.ReactNode }) {
  // const [state, dispatch] = useReducer(reducer, initialState)
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "loading" });
      try {
        const resp = await fetch(`${BASE_URL}/cities`);
        const data = await resp.json();
        dispatch({ type: "cities/loaded", payLoad: data });
      } catch {
        dispatch({type: "rejected",payLoad: "there was an error"});
      }
    };
    fetchCities();
  }, []);

  const getCity = async (id: string) => {
    if(id === currentCity?.id) return
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({type: "city/loaded", payLoad: data});
    } catch {
      dispatch({type: "rejected", payLoad: `Error occured getting city`});
    }
  };

  const createCity = async (newCity: NewCityProp) => {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({type: "city/created", payload: data})
    } catch  {
      dispatch({type: "rejected", payLoad: "Error creating city"})
    }
  };

  const deleteCity = async (id: string) => {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({type: "city/deleted", payload: id})
    } catch{
      dispatch({type: "rejected", payLoad: "Error creating city"})
    } 
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        error,
        // setCities,
        isLoading,
        // setLoading,
        currentCity,
        // setCurrentCity,
        getCity,
        createCity,
        deleteCity,
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
