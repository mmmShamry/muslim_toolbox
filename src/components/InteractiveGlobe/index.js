import React, { useState, useRef, useCallback, useEffect } from 'react';
import Globe from 'react-globe.gl';
import { feature } from 'topojson-client';
import { 
  comprehensiveWorldCities, 
  getCityColor, 
  getCitySize,
  continentColors,
  getMajorCities,
  getCapitalCities 
} from '../../data/worldCitiesData';
import './style.css';

const InteractiveGlobe = ({ onCitySelect, selectedCity }) => {
  const globeEl = useRef();
  const [hoverCity, setHoverCity] = useState(null);
  const [globeReady, setGlobeReady] = useState(false);
  const [countries, setCountries] = useState({ features: [] });
  const [cityFilter, setCityFilter] = useState('all'); // 'all', 'major', 'capitals'
  const [legendCollapsed, setLegendCollapsed] = useState(false);

  // Load countries data for boundaries
  useEffect(() => {
    // Load world map data
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then(res => res.json())
      .then(countries => {
        setCountries(countries);
      })
      .catch(err => {
        console.log('Could not load countries data:', err);
        // Fallback to empty countries
        setCountries({ features: [] });
      });
  }, []);

  // Get filtered cities based on current filter
  const getFilteredCities = () => {
    switch (cityFilter) {
      case 'major':
        return getMajorCities();
      case 'capitals':
        return getCapitalCities();
      default:
        return comprehensiveWorldCities;
    }
  };

  // Prepare city data for the globe
  const cityData = getFilteredCities().map(city => ({
    ...city,
    size: getCitySize(city.population),
    color: getCityColor(city)
  }));

  // Handle city click
  const handleCityClick = useCallback((city) => {
    if (onCitySelect) {
      onCitySelect(city);
    }
    
    // Animate globe to focus on the selected city
    if (globeEl.current) {
      globeEl.current.pointOfView(
        {
          lat: city.lat,
          lng: city.lng,
          altitude: 2
        },
        2000 // Animation duration in ms
      );
    }
  }, [onCitySelect]);

  // Handle city hover
  const handleCityHover = useCallback((city) => {
    setHoverCity(city);
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = !city; // Stop rotation on hover
    }
  }, []);

  // Initialize globe settings
  useEffect(() => {
    if (globeEl.current && globeReady) {
      // Set initial view
      globeEl.current.pointOfView({ altitude: 2.5 });
      
      // Enable auto-rotation
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.3;
      
      // Set control limits
      globeEl.current.controls().enableZoom = true;
      globeEl.current.controls().minDistance = 150;
      globeEl.current.controls().maxDistance = 1000;
    }
  }, [globeReady]);

  // Focus on selected city when it changes
  useEffect(() => {
    if (selectedCity && globeEl.current) {
      const city = comprehensiveWorldCities.find(c => 
        c.name === selectedCity.name && c.country === selectedCity.country
      );
      if (city) {
        globeEl.current.pointOfView(
          {
            lat: city.lat,
            lng: city.lng,
            altitude: 2
          },
          1500
        );
      }
    }
  }, [selectedCity]);

  return (
    <div className="interactive-globe-container">
      {/* Globe Controls */}
      <div className="globe-controls">
        <div className="control-group">
          <button 
            className="control-btn"
            onClick={() => globeEl.current?.pointOfView({ altitude: 2.5 }, 1000)}
            title="Reset View"
          >
            🌍 Reset
          </button>
          <button 
            className="control-btn"
            onClick={() => {
              const controls = globeEl.current?.controls();
              if (controls) {
                controls.autoRotate = !controls.autoRotate;
              }
            }}
            title="Toggle Rotation"
          >
            🔄 Rotate
          </button>
          <button 
            className="control-btn"
            onClick={() => {
              // Focus on Mecca
              const mecca = comprehensiveWorldCities.find(c => c.name === "Mecca");
              if (mecca) handleCityClick(mecca);
            }}
            title="Go to Mecca"
          >
            🕌 Mecca
          </button>
        </div>
      </div>

      {/* City Filter Controls */}
      <div className="city-filter-controls">
        <div className="filter-group">
          <button 
            className={`filter-btn ${cityFilter === 'all' ? 'active' : ''}`}
            onClick={() => setCityFilter('all')}
            title="Show All Cities"
          >
            🌆 All ({comprehensiveWorldCities.length})
          </button>
          <button 
            className={`filter-btn ${cityFilter === 'major' ? 'active' : ''}`}
            onClick={() => setCityFilter('major')}
            title="Major Cities Only"
          >
            🏙️ Major ({getMajorCities().length})
          </button>
          <button 
            className={`filter-btn ${cityFilter === 'capitals' ? 'active' : ''}`}
            onClick={() => setCityFilter('capitals')}
            title="Capital Cities Only"
          >
            🏛️ Capitals ({getCapitalCities().length})
          </button>
        </div>
      </div>

      {/* City Info Tooltip */}
      {hoverCity && (
        <div className="city-tooltip">
          <h4>{hoverCity.name}</h4>
          <p>{hoverCity.country}, {hoverCity.continent}</p>
          <p>{(hoverCity.population / 1000000).toFixed(1)}M people</p>
          {hoverCity.capital && <span className="capital-badge">Capital</span>}
          {hoverCity.holy && <span className="holy-badge">Holy City</span>}
          <small>Click to get prayer times</small>
        </div>
      )}

      {/* Globe Component */}
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        
        // Countries (Polygons for boundaries)
        polygonsData={countries.features}
        polygonCapColor={() => 'rgba(200, 200, 200, 0.1)'}
        polygonSideColor={() => 'rgba(200, 200, 200, 0.05)'}
        polygonStrokeColor={() => '#333'}
        polygonAltitude={0.001}
        
        // Points (Cities)
        pointsData={cityData}
        pointAltitude={0.02}
        pointRadius={d => d.size}
        pointColor={d => d.color}
        pointLabel={d => `
          <div class="globe-point-label">
            <strong>${d.name}</strong><br/>
            ${d.country}, ${d.continent}<br/>
            ${(d.population / 1000000).toFixed(1)}M people
            ${d.capital ? '<br/><span class="label-badge capital">Capital</span>' : ''}
            ${d.holy ? '<br/><span class="label-badge holy">Holy City</span>' : ''}
          </div>
        `}
        onPointClick={handleCityClick}
        onPointHover={handleCityHover}
        
        // Globe styling
        globeMaterial={{
          transparent: true,
          opacity: 0.9
        }}
        
        // Atmosphere
        showAtmosphere={true}
        atmosphereColor="#4A90E2"
        atmosphereAltitude={0.25}
        
        // Animation
        animateIn={true}
        onGlobeReady={() => setGlobeReady(true)}
        
        // Performance
        rendererConfig={{
          antialias: true,
          alpha: true
        }}
        
        width={800}
        height={600}
      />

      {/* Collapsible Legend */}
      <div className={`globe-legend ${legendCollapsed ? 'collapsed' : ''}`}>
        <div className="legend-header">
          <h4>🌍 Muslim Toolbox Globe</h4>
          <button 
            className="legend-toggle"
            onClick={() => setLegendCollapsed(!legendCollapsed)}
            title={legendCollapsed ? 'Show Legend' : 'Hide Legend'}
          >
            {legendCollapsed ? '📖' : '📕'}
          </button>
        </div>
        
        {!legendCollapsed && (
          <div className="legend-content">
            <div className="legend-section">
              <h5>Continents</h5>
              <div className="legend-items">
                {Object.entries(continentColors).map(([continent, color]) => (
                  <div key={continent} className="legend-item">
                    <span 
                      className="legend-dot continent" 
                      style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
                    ></span>
                    <span>{continent}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="legend-section">
              <h5>Special Cities</h5>
              <div className="legend-items">
                <div className="legend-item">
                  <span className="legend-dot holy-city"></span>
                  <span>Holy Cities</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot capital-city"></span>
                  <span>Capital Cities</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot major-city"></span>
                  <span>Major Cities (5M+)</span>
                </div>
              </div>
            </div>
            <div className="legend-instructions">
              <p>🖱️ <strong>Click:</strong> Get prayer times</p>
              <p>🖱️ <strong>Drag:</strong> Rotate globe</p>
              <p>⚡ <strong>Scroll:</strong> Zoom in/out</p>
              <p>🔍 <strong>Filter:</strong> Toggle city types</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveGlobe; 