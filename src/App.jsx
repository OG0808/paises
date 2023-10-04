// import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Cards from "./routes/Cards";
import CardCountry from "./routes/CardCountry";
import DarkMode from "./components/DarkMode";
import { useSelector } from "react-redux";

// import Filters from "./pages/Filters";
// import { Route, Routes } from "react-router-dom";

function App() {
  const isDarkMode = useSelector((reducers) => reducers.darkMode);

  return (
    <div className={isDarkMode?"main__containerDark":"main__container"}>
    <DarkMode/>
     <Routes>
      
      <Route path="/" element={<Cards/>}/>
      <Route path="/cardcountry/:countryName" element={<CardCountry/>}/>
     </Routes>
    </div>
  );

}

export default App;
