import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import type { CityProp } from "./types/types";
import CityList from "./components/CitiyList";
import City from "./components/City";
import Form from "./components/Form";

const BASE_URL = "http://localhost:8000";
function App() {
  const [cities, setCities] = useState<CityProp[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<Navigate to="cities" replace/>}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<p>List of countries</p>} />
          <Route path="form" element={<Form/>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
