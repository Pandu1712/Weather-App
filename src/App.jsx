import { useState, useEffect } from 'react';
import { fetchWeather, fetchForecast } from './Utils/api';
import SearchBar from './Components/SearchBar';
import WeatherCard from './Components/WeatherCard';
import WeatherDetail from './Components/WeatherDetail';
import ForecastList from './Components/ForecastList';
import ErrorMessage from './Components/ErrorMessage';
import ForecastItem from './Components/ForecastItem';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [units, setUnits] = useState('metric');
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('weatherSearchHistory')) || [];
    setSearchHistory(stored);
  }, []);

  const updateHistory = (city) => {
    const updated = [city, ...searchHistory.filter(c => c.toLowerCase() !== city.toLowerCase())];
    const limited = updated.slice(0, 5);
    setSearchHistory(limited);
    localStorage.setItem('weatherSearchHistory', JSON.stringify(limited));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('weatherSearchHistory');
  };

  const handleSearch = async (city) => {
    setError(null);
    try {
      const [weather, forecast] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city)
      ]);
      setWeatherData(weather);
      setForecastData(forecast.list);
      updateHistory(city);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData([]);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div>
          <h3>Recent Searches</h3>
          <ul>
            {searchHistory.map((city, i) => (
              <li key={i} style={{ cursor: 'pointer', color: 'blue' }} onClick={() => handleSearch(city)}>
                {city}
              </li>
            ))}
          </ul>
          <button onClick={clearHistory} style={{ color: 'white', backgroundColor: 'red', border: 'none', padding: '5px 10px' }}>
            Clear History
          </button>
        </div>
      )}

      {error && <ErrorMessage message={error} />}
      {weatherData && (
        <>
          <WeatherCard weatherData={weatherData} units={units} />
          <WeatherDetail weatherData={weatherData} />
        </>
      )}
      {forecastData.length > 0 && <ForecastList forecastData={forecastData} units={units} />}
    </div>
  );
}

export default App;
