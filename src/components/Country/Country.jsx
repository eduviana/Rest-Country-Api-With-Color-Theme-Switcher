import { Link } from "react-router-dom";
import { formatNumber } from "../../helpers/helpers";
import "./Country.scss";



const Country = ({ country }) => {

 

  return (
    <Link to={`/country/${country.name.common}`}>
      <div className="country">
        <img src={country.flags.svg} className="flag" alt={country.flags.alt} />
        <div className="information">
          <h2 className="name">{country.name.common}</h2>
          <div className="details">
            <div className="detail">
              <h4>Population:</h4>
              <span>{formatNumber(country.population)}</span>
            </div>
            <div className="detail">
              <h4>Región:</h4>
              <span>{country.region}</span>
            </div>
            <div className="detail">
              <h4>Capital:</h4>
              <span>{country.capital}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Country;
