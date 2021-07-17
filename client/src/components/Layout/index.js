import React from "react";

// css
import "./style.scss";
import "../../css/normalize.css";
import "../../css/global.scss";

// MetaWeather api
import { MetaWeather } from "../../api/metaweather";

// Component Imports
// import Header from "../Header";
import Main from "../Main";
import useForm from "../../hooks";


const Layout = () => {
  const {
    inputs,
    handleInputChange,
    handleSubmit,
    weather,
    location, 
  } = useForm(MetaWeather.fetchLocation);

  return (
    <div className="layout">
      <Main
        inputs={inputs}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        weather={weather}
        location={location}
      />
    </div>
  );
};

export default Layout;
