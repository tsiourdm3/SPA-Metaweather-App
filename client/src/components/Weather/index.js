import React, { useState } from "react";
// css
import "./style.scss";

const convertTemp = (temp, unit) => {
  if (unit === "c") {
    return Math.round(temp);
  } else {
    return Math.round(temp * (9 / 5) + 32);
  }
};


const Weather = props => {
  const [tempUnit] = useState("f");
  const symbol = tempUnit === "f" || tempUnit === "Unit" ? "°F" : "°C";
  
  let tableBody;
  let weatherClassName = "weather weather--hidden";

  if (props.weather && props.weather.length) {
    weatherClassName = "weather";

    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let tableRows = props.weather.map(weather => {
      // Return day as a string instead of an int.
      let day = new Date(weather.applicable_date);
      let dayString = days[day.getDay()];
      let low = convertTemp(weather.min_temp, tempUnit);
      let high = convertTemp(weather.max_temp, tempUnit);
      let currentTemp = convertTemp(weather.the_temp, tempUnit);

      return (
        <tr className="font-black" key={weather.id}>
          <td>
            <img
              alt="weather-icon"
              src={`https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`}
            ></img>
          </td>
          <td>{dayString}</td>
          <td>{currentTemp}°</td>
          <td>{low}°</td>
          <td>{high}°</td>
          <td>{Math.round(weather.wind_speed)}</td>
        </tr>
      );
    });

    tableBody = <tbody>{tableRows}</tbody>;
  }
  let loadingClassName =
    props.weather && props.weather.loading
      ? "loading"
      : "loading loading--hidden";

  let noResultsClassName =
    props.weather === undefined
      ? "no-results"
      : "no-results no-results--hidden";

  return (
    <div className="results-container">
      <div className="select">
        
      </div>
      <div className={loadingClassName}></div>
      <div className={noResultsClassName}>No Results Found.</div>
      <div className={weatherClassName}>
        <table>
          <thead>
            <tr>
              <th style={{ opacity: 0 }}>Icon</th>
              <th>Day</th>
              <th>
                Temp
                <br />
                {symbol}
              </th>
              <th>
                Low
                <br />
              </th>
              <th>
                High
                <br />
              </th>
              <th className="wind-speed">
                Wind
                <br />
                (mph)
              </th>
            </tr>
          </thead>
          {tableBody}
        </table>
      </div>
    </div>
  );
  };

export default Weather;