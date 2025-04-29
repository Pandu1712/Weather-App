// src/components/ForecastList.jsx
import ForecastItem from './ForecastItem';

function ForecastList({ forecastData, units }) {
  // Get every 8th item (~24h intervals)
  const daily = forecastData.filter((_, index) => index % 8 === 0);

  return (
    <div style={{ display: 'flex', gap: '1em', flexWrap: 'wrap' }}>
      {daily.map(item => (
        <ForecastItem key={item.dt} forecast={item} units={units} />
      ))}
    </div>
  );
}

export default ForecastList;
