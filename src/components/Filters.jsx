import { useEffect, useState } from "react";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import countriesNames from "../data/data.json";
import useFetch from "../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { dataCountrytext } from "../store/slices/filterSlice";
import useFecth from "../hooks/useFetch";
import "../style/Filters.css";

const Filters = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((reducers) => reducers.darkMode);
  // const names = countriesNames.map((countries) => countries.name);
  // const AllRegions = ["Africa", "Americas", "Asia", "Europe", "Oceania", "all"];
  const [selectedName, setSelectedName] = useState("");
  const [regionName, setRegion] = useState("");

  const url2 = `https://restcountries.com/v3.1/name/${selectedName}?fullText=true`;
  const url3 = `https://restcountries.com/v3.1/region/${regionName}`;
  const url1 = `https://restcountries.com/v3.1/all`;
  const [countries, getAllCountries] = useFecth(url1);
  const [countrie, getCountrie] = useFetch(url2);
  const [allRegions, getAllRegions] = useFetch(url3);

  const handleInputChange = (event) => {
    setSelectedName(event.target.value);
  };

  const handleSelectChange = (event) => {
    setRegion(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  // const handleName = (event, newValue) => {
  //   setSelectedName(newValue);
  // };
  // const handleRegion = (event, newValue) => {
  //   setRegion(newValue);
  // };

  //! En este efecto se pueden hacer las peticiones y tambien los dispatch pero genera un bucle infinito
  //! se traduce en mal rendimiento de la pagina

  // useEffect(() => {
  //   if (selectedName) {
  //     getCountrie();
  //     dispatch(dataCountrytext(countrie));
  //   } else if (regionName) {
  //     getAllRegions();
  //     dispatch(dataCountrytext(allRegions));
  //   } else {
  //     getAllCountries();
  //     dispatch(dataCountrytext(countries));
  //   }
  // }, [selectedName, regionName, countrie, allRegions]);

  //? esta es la mejor forma manejar cada peticion por separado con dos useEffect uno para hacer las peticiones a las apis
  //? y otro para enviar los datos con useDispatch

  useEffect(() => {
    if (selectedName) {
      getCountrie();
    } else if (regionName) {
      getAllRegions();
    } else {
      getAllCountries();
    }
  }, [selectedName, regionName]);

  useEffect(() => {
    if (countrie && selectedName) {
      dispatch(dataCountrytext(countrie));
    } else if (allRegions && regionName) {
      dispatch(dataCountrytext(allRegions));
    } else if (countries) {
      dispatch(dataCountrytext(countries));
    }
  }, [countrie, allRegions, countries, selectedName, regionName]);

  return (
    <section className="Filters__container">
      <form className="Filters__form" onSubmit={handleFormSubmit}>
        <div className="Filters__inputContainer">
          <label className="Filters__label">
            <input
              className={isDarkMode ? "Filters__inputDark" : 'Filters__input' }
              type="text"
              value={selectedName}
              onChange={handleInputChange}
              placeholder="Search country"
            />
          </label>
        </div>

        <div className="Filters__selectContainer">
          <label className="Filters__label">
            <select className={isDarkMode ?"Filters__selectDark":"Filters__select" } value={regionName} onChange={handleSelectChange}>
              <option value="">Search Region</option>
              <option value="">All regions</option>
              <option value="America">America</option>
              <option value="Asia">Asia</option>
              <option value="Africa">Africa</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </label>
        </div>
      </form>

      {/* <Autocomplete
      className="filter_country"
        onChange={handleName}
        disablePortal
        id="country-combo-box"
        options={names}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} placeholder="Country" />}
      />
      <Autocomplete
       
       className="filter_region"
        onChange={handleRegion}
        disablePortal
        id="region-combo-box"
        options={AllRegions}
        sx={{ width: 300, }}
        renderInput={((params) => (
          <TextField {...params} placeholder="Filter by Region"  />
        ))}
      /> */}
    </section>
  );
};

export default Filters;
