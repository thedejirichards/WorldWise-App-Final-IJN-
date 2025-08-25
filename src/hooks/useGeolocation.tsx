import { useState } from "react";
import type { PositionProp, useGeolocationProp } from "../types/types";

export function useGeolocation({defaultPosition=null}: useGeolocationProp) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<PositionProp | null>(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
    // alert("Clicked")
  }

  return { isLoading, position, error, getPosition };
}

