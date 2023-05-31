import Country from "../Country/Country";
import "./CountryList.scss";

const CountryList = ({ countries }) => {
  return (
    <div className="countryList">
      <div className="container">
        <div className="grid">
          {countries?.map((country) => (
            <Country key={country.name.common} country={country} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountryList;
