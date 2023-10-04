import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFecth from "../hooks/useFetch";
import "../style/CardCountry.css";
import { useSelector } from "react-redux";
// import { selectDarkMode } from "../store/slices/darkMode";

const CardCountry = () => {
  const isDarkMode = useSelector((reducers) => reducers.darkMode);
  const { countryName } = useParams();
  const [borderCountry, setBorderCountry] = useState([]);

  console.log(isDarkMode);
  const navigate = useNavigate();

  const url2 = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  const [countrie, getCountrie] = useFecth(url2);

  useEffect(() => {
    getCountrie();
  }, [countryName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        let border_codes;
        for (let country of data) {
          if (country?.name?.common === countryName) {
            border_codes = country.borders;
            break;
          }
        }

        let border_countries = [];
        for (let code of border_codes) {
          for (let country of data) {
            if (country?.cca3 === code) {
              border_countries.push(country.name.common);
              break;
            }
          }
        }

        setBorderCountry(border_countries);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [countryName]);

  const handleClick = (border) => {
    navigate(`/cardcountry/${border}`);
  };

  return (
<div className={isDarkMode ? "card-country dark" : "card-country"}>
  <Link className={isDarkMode ? "card-country__button-container dark" : "card-country__button-container"} to={"/"}>
    <button className={isDarkMode ? "card-country__button dark" : "card-country__button"}>
      <i className="bx bxs-left-arrow "></i>Back
    </button>
  </Link>
  
  {countrie?.map((country) => {
    if (!country) return null;

    const languages = Object.values(country.languages || {}).join(", ");

    return (
      <section className={isDarkMode ? "country dark" : "country"} key={country?.name?.common}>
        <div className={isDarkMode ? "country__flag dark" : "country__flag"}>
          <img src={country?.flags?.svg} alt={country?.name?.common} />
        </div>

        <div className={isDarkMode ? "country__info dark" : "country__info"}>
          <h2 className={isDarkMode ? "country__title dark" : "country__title"}>{country?.name?.common}</h2>
          
          <div className={isDarkMode ? "country__details dark" : "country__details"}>
            <ul className={isDarkMode ? "country__list dark" : "country__list"}>
              <li>
                <span className={isDarkMode ? "country__label dark" : "country__label"}>Native Name:</span>
                {Object.values(country?.name?.nativeName || {})
                  .map((name) => name.common)
                  .join(", ")}
              </li>
              <li>
                <span className={isDarkMode ? "country__label dark" : "country__label"}>Population:</span>{" "}
                {country?.population}
              </li>
              <li>
                <span className={isDarkMode ? "country__label dark" : "country__label"}>Region:</span>
                {country?.region}
              </li>
              <li>
                <span className={isDarkMode ? "country__label dark" : "country__label"}>Subregion:</span>
                {country?.subregion}
              </li>
              <li>
                <span className={isDarkMode ? "country__label dark" : "country__label"}>Capital:</span>
                {country?.capital}
              </li>
            </ul>
            <ul className={isDarkMode ? "country__list dark" : "country__list"}>
              <li>
                <span className={isDarkMode ? "country__label dark" : "country__label"}>Top Level Domain:</span>
                {country?.tld?.join(", ")}
              </li>
              <li>
                <span className={isDarkMode ? "country__label dark" : "country__label"}>Currency:</span>
                {Object.values(country?.currencies || {})
                  .map((currency) => currency.name)
                  .join(", ")}
              </li>
              <li>
                <span className={isDarkMode ? "country__label dark" : "country__label"}>Languages:</span> 
                {languages}
              </li>
            </ul>
          </div>

          <div className={isDarkMode ? "country__border dark" : "country__border"}>
            <h4 className={isDarkMode ? "country__border-title dark" : "country__border-title"}>border Countries</h4>
            <div className={isDarkMode ? "country__border-list dark" : "country__border-list"}>
              {borderCountry.map((border) => (
                <button
                  className={isDarkMode ? "country__border-button dark" : "country__border-button"}
                  key={border}
                  onClick={() => handleClick(border)}
                >
                  {border}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  })}
</div>

  );
};

export default CardCountry;
