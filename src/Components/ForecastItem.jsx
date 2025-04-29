// src/components/ForecastItem.jsx
function ForecastItem({ forecast, units }) {
    const date = new Date(forecast.dt_txt).toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  
    return (
      <div style={{ background: '#4a6cf7', color: '#fff', padding: '1em', borderRadius: '8px', margin: '0.5em' }}>
        <p>{date}</p>
        <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="icon" />
        <p>{Math.round(forecast.main.temp)}°{units === 'metric' ? 'C' : 'F'}</p>
        <p>Humidity: {forecast.main.humidity}%</p>
        <p>Wind: {forecast.wind.speed} MPH</p>
      </div>
    );
  }
  export default ForecastItem;
  