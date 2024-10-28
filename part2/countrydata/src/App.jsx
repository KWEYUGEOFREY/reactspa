import React, { useState, useEffect } from 'react'
import axios from 'axios';
import CountryList from './components/CountryList'
import CountryDetails from './components/countryDetails'

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      })
  }, [])

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    filterCountries(event.target.value)
  }

  const filterCountries = (query) => {
    const result = countries.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(result)
  }

  return (
    <div>
      <h1>Country Information</h1>
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="Search for a country"
      />

      {filteredCountries.length > 10 && (
        <p>Too many matches, please make your query more specific.</p>
      )}
      {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
        <CountryList countries={filteredCountries} />
      )}
      {filteredCountries.length === 1 && (
        <CountryDetails country={filteredCountries[0]} />
      )}
    </div>
  )
}

export default App
