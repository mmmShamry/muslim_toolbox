import React from 'react';
import './style.css';

const PrayerCard = ({ name, time, icon, description }) => {
  return (
    <div className="prayer-card">
      <div className="prayer-icon">
        {icon || '🕌'}
      </div>
      <h3 className="prayer-name">{name}</h3>
      <p className="prayer-time">{time}</p>
      {description && (
        <p className="prayer-description">{description}</p>
      )}
    </div>
  );
};

export default PrayerCard; 