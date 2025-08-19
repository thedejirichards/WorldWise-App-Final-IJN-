export type ButtonProp = {
  children: React.ReactNode;
  onClick?: (e: React.FormEvent) => void;
  type: string;
};

export type CityProp = {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: string;
};

export type CityListProp = {
  cities: CityProp[] | null;
  isLoading: boolean;
};

export type CountryProp = {
  country: string;
  emoji: string;
  id: string;
};

export type CountryListProp = {
  cities: CityProp[] | null;
  isLoading: boolean;
};

export type CountryItemProp = {
  country: CountryProp;
};

export type CitiesContextProps = {
  cities: CityProp[] | null;
  setCities: React.Dispatch<React.SetStateAction<CityProp[] | null>>;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  currentCity: CityProp | null;
  setCurrentCity: React.Dispatch<React.SetStateAction<CityProp | null>>;
  getCity: (id: string) => void
};
