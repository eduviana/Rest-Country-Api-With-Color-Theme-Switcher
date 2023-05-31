import React, { useEffect, useState } from "react";
import "./FilterBar.scss";

const Filterbar = ({
  searchCountry,
  setSearchCountry,
  filterByTerm,
  selectedRegion,
  setSelectedRegion,
  filterByRegion,
}) => {
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchCountry(searchTerm);

    // Cancelar el tiempo de espera existente
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Configurar un nuevo tiempo de espera antes de realizar la búsqueda
    const timeout = setTimeout(() => {
      if (searchTerm === "") {
        filterByTerm(null); // Sin filtro de búsqueda
      } else {
        filterByTerm(searchTerm);
      }
    }, 500);

    setTypingTimeout(timeout);
  };

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setSelectedRegion(selectedRegion);
    filterByRegion(selectedRegion);
  };

  useEffect(() => {
    // Limpiar el tiempo de espera cuando el componente se desmonta
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <article className="filterBar">
      <div className="container">
        <div className="flex">
          <div className="input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="icon-search"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <input
              type="text"
              className="search"
              placeholder="Search for a country..."
              value={searchCountry || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="filters">
            <div className="filter-wrapper">
              <select
                className="filter"
                value={selectedRegion}
                onChange={handleRegionChange}
              >
                <option disabled value="" hidden>
                  Filter by Region
                </option>
                <option value="">All</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="filter-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Filterbar;
