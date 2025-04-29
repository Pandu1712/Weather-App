// src/components/SearchBar.jsx
import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Enter city name" 
        value={city} 
        onChange={handleChange} 
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;