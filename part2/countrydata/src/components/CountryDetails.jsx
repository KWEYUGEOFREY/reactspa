// src/components/CountryDetails.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;
  const capital = country.capital[0];

  useEffect(() => {
    if (capital) {
      const fetchWeather = async () => {
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
              q: capital,
              units: 'metric',
              appid: api_key
            }
          });
          setWeather(response.data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };
      fetchWeather();
    }
  }, [capital, api_key]);

  const languages = Object.values(country.languages);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Area:</strong> {country.area} km²</p>

      <h3>Languages:</h3>
      <ul>
        {languages.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={`${country.name.common} flag`} width="150" />

      {weather && (
        <div>
          <h3>Weather in {capital}</h3>
          <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
          <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  )
}

export default CountryDetails

