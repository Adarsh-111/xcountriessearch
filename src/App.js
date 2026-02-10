import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Fetch countries data on component mount
  useEffect(() => {
    fetchCountries();
  }, []);

  // Filter countries whenever searchTerm or countries change
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [searchTerm, countries]);

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        'https://countries-search-data-prod-812920491762.asia-south1.run.app/countries'
      );
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for countries"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="countries-container">
        {filteredCountries.map((country) => (
          <div key={country.abbr} className="countryCard">
            <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
              className="country-flag"
            />
            <h3 className="country-name">{country.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
