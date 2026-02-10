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
      const filtered = countries.filter(country => {
        const countryName = country.common || '';
        return countryName.toLowerCase().includes(searchTerm.toLowerCase());
      });
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
        {filteredCountries.map((country, index) => (
          <div key={index} className="countryCard">
            <img
              src={country.png}
              alt={`Flag of ${country.common}`}
              className="country-flag"
            />
            <div className="country-name">{country.common}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;