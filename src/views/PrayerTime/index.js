import React, { useState, useEffect } from 'react';
import InteractiveGlobe from '../../components/InteractiveGlobe';
import PrayerCard from '../../components/PrayerCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { comprehensiveWorldCities } from '../../data/worldCitiesData';
import './style.css';

const PrayerTime = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [showTraditionalForm, setShowTraditionalForm] = useState(false);
  
  // Traditional form inputs
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const formatDate = (date) => {
    return date.toLocaleDateString('en-CA'); // YYYY-MM-DD format
  };

  const fetchPrayerTimes = async (cityName, countryName) => {
    setLoading(true);
    setError('');
    
    try {
      const currentDate = formatDate(new Date());
      const location = countryName ? `${cityName},${countryName}` : cityName;
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByAddress/${currentDate}?address=${encodeURIComponent(location)}&method=2`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch prayer times');
      }
      
      const data = await response.json();
      
      if (data.code === 200) {
        setPrayerTimes(data.data);
        setSelectedCity({ name: cityName, country: countryName });
      } else {
        throw new Error('Invalid location or no data available');
      }
    } catch (err) {
      setError(err.message);
      setPrayerTimes(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelectFromGlobe = (city) => {
    fetchPrayerTimes(city.name, city.country);
  };

  const handleTraditionalSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchPrayerTimes(city.trim(), country.trim());
    }
  };

  // Load default prayer times (Mecca) on component mount
  useEffect(() => {
    fetchPrayerTimes('Mecca', 'Saudi Arabia');
  }, []);

  const formatTime = (time) => {
    if (!time) return '';
    
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get some popular cities from our comprehensive dataset
  const getPopularCities = () => {
    return [
      comprehensiveWorldCities.find(c => c.name === 'Mecca'),
      comprehensiveWorldCities.find(c => c.name === 'Medina'),
      comprehensiveWorldCities.find(c => c.name === 'Istanbul'),
      comprehensiveWorldCities.find(c => c.name === 'Cairo'),
      comprehensiveWorldCities.find(c => c.name === 'Jakarta'),
      comprehensiveWorldCities.find(c => c.name === 'Karachi')
    ].filter(Boolean); // Remove any undefined cities
  };

  return (
    <div className="prayer-time-page">
      <div className="container">
                <header className="page-header">          <h1>🕌 Prayer Time</h1>          <p>Interactive 3D Globe - Click on any city worldwide to get accurate prayer times</p>
          <div className="header-stats">
            <span>🌍 {comprehensiveWorldCities.length} Cities Available</span>
            <span>📅 {getCurrentDate()}</span>
          </div>
        </header>

        {/* Interactive Globe Section */}
        <div className="globe-section">
          <InteractiveGlobe 
            onCitySelect={handleCitySelectFromGlobe}
            selectedCity={selectedCity}
          />
        </div>

        {/* Toggle Traditional Form */}
        <div className="form-toggle">
          <button 
            className="toggle-btn"
            onClick={() => setShowTraditionalForm(!showTraditionalForm)}
          >
            {showTraditionalForm ? '🌍 Use Globe' : '📝 Manual Entry'}
          </button>
        </div>

        {/* Traditional Form (Collapsible) */}
        {showTraditionalForm && (
          <div className="traditional-form-section">
            <form onSubmit={handleTraditionalSubmit} className="prayer-form">
              <h3>Manual City Entry</h3>
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="country">Country (Optional)</label>
                  <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Enter country name"
                  />
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Loading...' : 'Get Prayer Times'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Results Section */}
        {loading && (
          <div className="loading-section">
            <LoadingSpinner />
            <p>Fetching prayer times...</p>
          </div>
        )}

        {error && (
          <div className="error-section">
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
              <small>Please try a different city or check your spelling.</small>
            </div>
          </div>
        )}

        {prayerTimes && !loading && (
          <div className="results-section">
            <div className="location-info">
              <h2>
                📍 {selectedCity?.name}
                {selectedCity?.country && `, ${selectedCity.country}`}
              </h2>
              <div className="date-info">
                <p><strong>Hijri Date:</strong> {prayerTimes.date.hijri.date} {prayerTimes.date.hijri.month.en} {prayerTimes.date.hijri.year}</p>
                <p><strong>Gregorian Date:</strong> {prayerTimes.date.readable}</p>
              </div>
            </div>

            <div className="prayer-times-grid">
              <PrayerCard 
                name="Fajr" 
                time={formatTime(prayerTimes.timings.Fajr)} 
                icon="🌅"
                description="Dawn Prayer"
              />
              <PrayerCard 
                name="Sunrise" 
                time={formatTime(prayerTimes.timings.Sunrise)} 
                icon="☀️"
                description="Sun Rising"
              />
              <PrayerCard 
                name="Dhuhr" 
                time={formatTime(prayerTimes.timings.Dhuhr)} 
                icon="🌞"
                description="Noon Prayer"
              />
              <PrayerCard 
                name="Asr" 
                time={formatTime(prayerTimes.timings.Asr)} 
                icon="🌤️"
                description="Afternoon Prayer"
              />
              <PrayerCard 
                name="Maghrib" 
                time={formatTime(prayerTimes.timings.Maghrib)} 
                icon="🌅"
                description="Sunset Prayer"
              />
              <PrayerCard 
                name="Isha" 
                time={formatTime(prayerTimes.timings.Isha)} 
                icon="🌙"
                description="Night Prayer"
              />
            </div>

            <div className="additional-info">
              <div className="info-card">
                <h4>🕌 Qibla Direction</h4>
                <p>{prayerTimes.meta.method.name}</p>
                <small>Calculation Method Used</small>
              </div>
              <div className="info-card">
                <h4>🌍 Location</h4>
                <p>Latitude: {prayerTimes.meta.latitude}°</p>
                <p>Longitude: {prayerTimes.meta.longitude}°</p>
              </div>
              <div className="info-card">
                <h4>⏰ Timezone</h4>
                <p>{prayerTimes.meta.timezone}</p>
                <small>Local Timezone</small>
              </div>
            </div>
          </div>
        )}

        {/* Quick Access Cities */}
        <div className="quick-cities">
          <h3>🌟 Popular Islamic Cities</h3>
          <div className="city-buttons">
            {getPopularCities().map((cityData, index) => (
              <button
                key={index}
                className="city-btn"
                onClick={() => handleCitySelectFromGlobe(cityData)}
              >
                {cityData.name}
                {cityData.holy && <span className="holy-indicator">🕌</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerTime;
