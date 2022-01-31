import React, { useEffect, useState } from "react";
import axios from "axios";
const Nation = ({ nation }) => {
  const [weather, setWeather] = useState();
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${nation.capital}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [nation.capital]);

  return (
    <>
      <h1>{nation.name.common}</h1>

      <p>capital {nation.capital}</p>
      <p>population {nation.population}</p>

      <h2>languages</h2>
      <ul>
        {Object.keys(nation.languages).map((tag, index) => (
          <li key={index}>{nation.languages[tag]}</li>
        ))}
      </ul>
      <img src={nation.flags.png} alt="flag" />
      {weather ? (
        <>
          <h2>Weather in {nation.capital}</h2>
          <p>temperature: {weather.main.temp}</p>
          <p>wind: {weather.wind.speed}</p>
        </>
      ) : (
        <p>The weather is not available</p>
      )}
    </>
  );
};

export default Nation;
