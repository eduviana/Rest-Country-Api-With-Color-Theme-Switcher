import React, { useEffect, useState } from "react";
import Filterbar from "./components/FilterBar/Filterbar";
import CountryList from "./components/CountryList/CountryList";
import "./App.scss";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    const getCountries = async () => {
      const api = "https://restcountries.com/v3.1/all";
      const res = await fetch(api);
      const data = await res.json();
      setAllCountries(data);
      setFilteredCountries(data);
    };
    getCountries();
  }, []);

  const filterByTerm = (term) => {
    setSearchCountry(term); // Actualizar el estado del término de búsqueda
    if (term === null || term === "") {
      setFilteredCountries(allCountries); // Mostrar todos los países nuevamente
      return;
    }
    const filtered = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const filterByRegion = (region) => {
    setSelectedRegion(region); // Actualizar el estado de la región seleccionada
    if (region === "") {
      setFilteredCountries(allCountries); // Mostrar todos los países nuevamente
      return;
    }
    const filteredByRegion = allCountries.filter(
      (country) => country.region === region
    );
    setFilteredCountries(filteredByRegion);
  };

  return (
    <>
      <Filterbar
        searchCountry={searchCountry}
        setSearchCountry={setSearchCountry}
        filterByTerm={filterByTerm}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        filterByRegion={filterByRegion}
      />
      <CountryList countries={filteredCountries} />
    </>
  );
}

export default App;