// src/components/CountryDetails.js

import React from 'react';

const CountryDetails = ({ country }) => {
  const languages = Object.values(country.languages);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Area:</strong> {country.area} km²</p>

      <h3>Languages:</h3>
      <ul>
        {languages.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={`${country.name.common} flag`} width="150" />
    </div>
  );
};

export default CountryDetails;
