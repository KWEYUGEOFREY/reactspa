import React from 'react'

const CountryList = ({ countries, onShowCountry }) => {
  return (
    <div>
      <h2>Countries</h2>
      <ul>
        {countries.map(country => (
          <li key={country.cca3}>
            {country.name.common}{' '}
            <button onClick={() => onShowCountry(country)}>Show</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList
