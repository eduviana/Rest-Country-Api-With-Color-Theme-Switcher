import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./CountryDetail.scss";
import { formatNumber } from "../helpers/helpers";

const CountryDetail = () => {
  const [country, setCountry] = useState([]);
  const [borderNames, setBorderNames] = useState([]);
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getCountry = async () => {
      const api = `https://restcountries.com/v3.1/name/${name}`;
      const res = await fetch(api);
      const data = await res.json();
      setCountry(data[0]);
      fetchBorderNames(data[0].borders);
    };
    getCountry();
  }, [name]);

  // const fetchBorderNames = async (borders) => {
  //   const borderCountryNames = await Promise.all(
  //     borders.map((border) => fetchCountryName(border))
  //   );
  //   setBorderNames(borderCountryNames);
  // };
  const fetchBorderNames = async (borders) => {
    if (!borders) {
      return;
    }

    const borderCountryNames = await Promise.all(
      borders.map((border) => fetchCountryName(border))
    );
    setBorderNames(borderCountryNames);
  };

  const fetchCountryName = async (code) => {
    const api = `https://restcountries.com/v3.1/alpha/${code}`;
    const res = await fetch(api);
    const data = await res.json();
    return data[0]?.name?.common || "País Desconocido";
  };

  const renderNativeName = () => {
    if (country.length === 0 || !country.name.nativeName) {
      return null;
    }

    const firstLanguage = Object.entries(country.name.nativeName)[0];
    const firstCommonName = firstLanguage[1].common;
    return firstCommonName;
  };

  const renderCurrencies = () => {
    if (country.length === 0 || !country.currencies) {
      return null;
    }

    const currencies = country.currencies;
    const currencyKeys = Object.keys(currencies);

    return currencyKeys.map((key) => {
      const { name } = currencies[key];
      return name;
    });
  };

  const renderLanguages = () => {
    if (country.length === 0 || !country.languages) {
      return null;
    }
    const languages = country.languages;
    const languageKeys = Object.keys(languages);
    const languageList = languageKeys.map((key) => languages[key]);
    const sortedLanguages = languageList.sort();

    const formattedLanguages = sortedLanguages.join(", ");

    return <span>{formattedLanguages}</span>;
  };

  return (
    <>
      <div className="container">
        <div className="countryDetail">
          <div className="btnContainer">
            <button className="button" onClick={() => navigate(-1)}>
              <span>🠄</span>Back
            </button>
          </div>
          <div className="card">
            <img
              className="flag"
              src={country?.flags?.svg}
              alt={country?.flags?.alt}
            />
            <div className="cardBody">
            <h2 className="name">{country?.name?.common}</h2>
              <div className="flexRow">
                <div className="infoFirst">
                  
                  <div className="detail">
                    <h4>Native Name:</h4>
                    <span>{renderNativeName(country)}</span>
                  </div>
                  <div className="detail">
                    <h4>Population:</h4>
                    <span>{formatNumber(country?.population)}</span>
                  </div>
                  <div className="detail">
                    <h4>Region:</h4>
                    <span>{country?.region}</span>
                  </div>
                  <div className="detail">
                    <h4>Sub Region:</h4>
                    <span>{country?.subregion}</span>
                  </div>
                  <div className="detail">
                    <h4>Capital:</h4>
                    <span>{country?.capital?.[0]}</span>
                  </div>
                </div>

                <div className="infoSecond">
                  <div className="detail">
                    <h4>Top Level Domain:</h4>
                    <span>{country?.tld}</span>
                  </div>
                  <div className="detail">
                    <h4>Currencies:</h4>
                    <span>{renderCurrencies()}</span>
                  </div>
                  <div className="detail">
                    <h4>Languages:</h4>
                    <div className="languages">{renderLanguages()}</div>
                  </div>
                </div>
              </div>

              <div className="infoThird">
                <h3>Border Countries:</h3>
                <div className="borderCountries">
                  {borderNames.length === 0 ? (
                    <p>No border countries found...</p>
                  ) : (
                    borderNames.map((name, index) => (
                      // <span key={index}>{name}</span>
                      <Link key={index} to={`/country/${name}`}>
                        {name}
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryDetail;
