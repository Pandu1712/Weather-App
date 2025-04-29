function WeatherCard({ weatherData, units }) {
    if (!weatherData) return null;
  
    const { name, main, weather } = weatherData;
    const temperature = Math.round(main.temp);
    const unitSymbol = units === 'metric' ? 'C' : 'F';
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  
    return (
      <div className="weather-card">
        <h2>{name}</h2>
        <p>{temperature}°{unitSymbol}</p>
        <p>{weather[0].description}</p>
        <img src={iconUrl} alt={weather[0].description} />
      </div>
    );
  }
  
  export default WeatherCard;
  