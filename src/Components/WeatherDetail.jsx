function WeatherDetail({ weatherData }) {
    const { main, wind, humidity } = weatherData;
    return (
      <div>
        <p>Humidity: {main.humidity}%</p>
        <p>Wind Speed: {wind.speed} m/s</p>
      </div>
    );
  }
  export default WeatherDetail;