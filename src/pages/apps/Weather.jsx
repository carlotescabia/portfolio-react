import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Wind, Droplets, Eye, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import CircularText from '../../components/ui/CircularText';
import './Weather.css';

const Weather = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weatherData, setWeatherData] = useState({
    current: {
      temp: 26,
      feels_like: 29,
      description: 'Soleado',
      wind_speed: 12,
      wind_deg: 180,
      humidity: 65,
      uvi: 7
    },
    hourly: [
      { dt: Date.now()/1000, temp: 26, weather: [{ description: 'Soleado' }] },
      { dt: Date.now()/1000 + 3600, temp: 28, weather: [{ description: 'Soleado' }] },
      { dt: Date.now()/1000 + 7200, temp: 30, weather: [{ description: 'Pocas nubes' }] },
      { dt: Date.now()/1000 + 10800, temp: 32, weather: [{ description: 'Pocas nubes' }] },
      { dt: Date.now()/1000 + 14400, temp: 31, weather: [{ description: 'Nublado' }] },
      { dt: Date.now()/1000 + 18000, temp: 28, weather: [{ description: 'Nublado' }] },
      { dt: Date.now()/1000 + 21600, temp: 25, weather: [{ description: 'Lluvia ligera' }] },
      { dt: Date.now()/1000 + 25200, temp: 23, weather: [{ description: 'Lluvia ligera' }] }
    ]
  });

  // Productos estacionales por mes
  const getSeasonalData = () => {
    const month = currentDate.getMonth() + 1;
    const seasonalData = {
      8: { // Agosto
        illustration: '🍑🍅',
        title: 'Productos de Agosto',
        items: [
          { icon: '🍅', name: 'Tomates' },
          { icon: '🍑', name: 'Melocotones' },
          { icon: '🥒', name: 'Pepinos' },
          { icon: '🌶️', name: 'Pimientos' },
          { icon: '🍇', name: 'Uvas' },
          { icon: '🥗', name: 'Ensaladas' }
        ]
      }
    };
    return seasonalData[month] || seasonalData[8];
  };

  const getWeatherIcon = (description) => {
    const icons = {
      'soleado': '☀️',
      'pocas nubes': '🌤️',
      'nublado': '☁️',
      'lluvia ligera': '🌦️',
      'lluvia': '🌧️'
    };
    return icons[description.toLowerCase()] || '🌤️';
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatHour = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWindDirection = (degrees) => {
    const directions = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const seasonalData = getSeasonalData();

  return (
    <div className="weather-page">
      <div className="weather-container">
        {/* Header */}
        <motion.header 
          className="weather-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="back-button">
            <ArrowLeft size={20} />
            Volver
          </Link>
          <div className="weather-title">
            <h1>Weather Barcelona</h1>
            <CircularText 
              text="• Barcelona • España • "
              spinDuration={25}
              onHover="pause"
              size="small"
              className="weather-location-text"
            />
          </div>
          <div className="current-date">{formatDate(currentDate)}</div>
        </motion.header>

        {/* Main Weather Display */}
        <motion.main 
          className="main-weather card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="current-weather">
            <div className="weather-main">
              <div className="weather-icon">
                <span className="weather-symbol">
                  {getWeatherIcon(weatherData.current.description)}
                </span>
                <CircularText 
                  text={`• ${weatherData.current.description} • `}
                  spinDuration={30}
                  onHover="speedUp"
                  size="large"
                  className="weather-icon-text"
                />
              </div>
              <div className="weather-info">
                <div className="temperature">{Math.round(weatherData.current.temp)}°</div>
                <div className="weather-description">{weatherData.current.description}</div>
                <div className="location">Barcelona, España</div>
              </div>
            </div>

            {/* Weather Details */}
            <div className="weather-details grid grid--2">
              <div className="detail-card card">
                <div className="detail-icon">🌡️</div>
                <div className="detail-info">
                  <div className="detail-label">Sensación</div>
                  <div className="detail-value">{Math.round(weatherData.current.feels_like)}°</div>
                </div>
              </div>
              
              <div className="detail-card card">
                <div className="detail-icon">💨</div>
                <div className="detail-info">
                  <div className="detail-label">Viento</div>
                  <div className="detail-value">
                    {Math.round(weatherData.current.wind_speed)} km/h
                    <span className="wind-arrow">{getWindDirection(weatherData.current.wind_deg)}</span>
                  </div>
                </div>
              </div>

              <div className="detail-card card">
                <div className="detail-icon">💧</div>
                <div className="detail-info">
                  <div className="detail-label">Humedad</div>
                  <div className="detail-value">{weatherData.current.humidity}%</div>
                </div>
              </div>

              <div className="detail-card card">
                <div className="detail-icon">☀️</div>
                <div className="detail-info">
                  <div className="detail-label">UV Index</div>
                  <div className="detail-value">{weatherData.current.uvi}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.main>

        {/* Hourly Forecast */}
        <motion.section 
          className="hourly-forecast card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2>Próximas Horas</h2>
          <div className="hourly-container">
            {weatherData.hourly.slice(0, 8).map((hour, index) => (
              <motion.div
                key={index}
                className="hourly-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="hourly-time">{formatHour(hour.dt)}</div>
                <div className="hourly-icon">
                  {getWeatherIcon(hour.weather[0].description)}
                </div>
                <div className="hourly-temp">{Math.round(hour.temp)}°</div>
                <div className="hourly-desc">{hour.weather[0].description}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Seasonal Section */}
        <motion.section 
          className="seasonal-section card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="seasonal-illustration">
            <div className="seasonal-emoji">{seasonalData.illustration}</div>
            <CircularText 
              text="• Productos de temporada • Frescos • "
              spinDuration={35}
              onHover="slowDown"
              size="large"
              className="seasonal-text"
            />
          </div>
          <div className="seasonal-info">
            <h3>{seasonalData.title}</h3>
            <div className="seasonal-items grid grid--3">
              {seasonalData.items.map((item, index) => (
                <motion.div
                  key={index}
                  className="seasonal-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="seasonal-item-icon">{item.icon}</div>
                  <div className="seasonal-item-name">{item.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Weather;
