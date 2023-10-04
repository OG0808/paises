import { useSelector } from "react-redux";
import Filters from "../components/Filters";
import "../style/Cards.css";
import { useEffect } from "react";
import useFecth from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const navigate = useNavigate();

  const displayData = useSelector((reducers) => reducers.dataCountry);
  const isDarkMode = useSelector((reducers) => reducers.darkMode);
  
  const url1 = `https://restcountries.com/v3.1/all`;
  const [countries, getAllCountries] = useFecth(url1);

  useEffect(() => {
    getAllCountries();
  }, []);

  const handleClick = (countryName) => {
    navigate(`/cardcountry/${countryName}`);
  };

  return (
    <section className={`main-section ${isDarkMode ? 'dark' : ''}`}>
    
    <Filters className={`main-section__filters ${isDarkMode ? 'dark' : ''}`} />
    <section className={`main-section__cards ${isDarkMode ? 'dark' : ''}`}>
      {(displayData ? displayData : countries)?.map((country) => (
        <div
          onClick={() => handleClick(country.name.common)}
          key={country.name.common}
          className={`main-section__card ${isDarkMode ? 'dark' : ''}`}
        >
          <img 
              src={country.flags.png} 
              alt={country.name.common} 
              className={`main-section__card-image ${isDarkMode ? 'dark' : ''}`}
          />
          <h2 className={`main-section__card-title ${isDarkMode ? 'dark' : ''}`}>{country.name.common}</h2>
          <ul className={`main-section__card-list ${isDarkMode ? 'dark' : ''}`}>
            <li className={`main-section__card-item ${isDarkMode ? 'dark' : ''}`}>
              <span className={`main-section__card-label ${isDarkMode ? 'dark' : ''}`}>Population:</span>{" "}
              {country.population}
            </li>
            <li className={`main-section__card-item ${isDarkMode ? 'dark' : ''}`}>
              <span className={`main-section__card-label ${isDarkMode ? 'dark' : ''}`}>Region:</span> {country.region}
            </li>
            <li className={`main-section__card-item ${isDarkMode ? 'dark' : ''}`}>
              <span className={`main-section__card-label ${isDarkMode ? 'dark' : ''}`}>Capital: </span>
              {country.capital}
            </li>
          </ul>
        </div>
      ))}
    </section>
</section>


  );
};

export default Cards;
