export const worldCities = [
  // Middle East
  { name: "Mecca", country: "Saudi Arabia", lat: 21.4225, lng: 39.8262, population: 2000000 },
  { name: "Medina", country: "Saudi Arabia", lat: 24.4686, lng: 39.6142, population: 1500000 },
  { name: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lng: 46.6753, population: 7000000 },
  { name: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708, population: 3500000 },
  { name: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784, population: 15000000 },
  { name: "Tehran", country: "Iran", lat: 35.6892, lng: 51.3890, population: 9000000 },
  { name: "Baghdad", country: "Iraq", lat: 33.3128, lng: 44.3615, population: 7000000 },
  { name: "Damascus", country: "Syria", lat: 33.5138, lng: 36.2765, population: 2000000 },
  { name: "Amman", country: "Jordan", lat: 31.9454, lng: 35.9284, population: 4000000 },
  { name: "Kuwait City", country: "Kuwait", lat: 29.3759, lng: 47.9774, population: 3000000 },
  { name: "Doha", country: "Qatar", lat: 25.2854, lng: 51.5310, population: 2800000 },
  { name: "Jerusalem", country: "Palestine", lat: 31.7683, lng: 35.2137, population: 900000 },

  // South Asia
  { name: "Karachi", country: "Pakistan", lat: 24.8607, lng: 67.0011, population: 16000000 },
  { name: "Lahore", country: "Pakistan", lat: 31.5204, lng: 74.3587, population: 12000000 },
  { name: "Islamabad", country: "Pakistan", lat: 33.6844, lng: 73.0479, population: 2000000 },
  { name: "Dhaka", country: "Bangladesh", lat: 23.8103, lng: 90.4125, population: 22000000 },
  { name: "Delhi", country: "India", lat: 28.7041, lng: 77.1025, population: 32000000 },
  { name: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777, population: 21000000 },
  { name: "Hyderabad", country: "India", lat: 17.3850, lng: 78.4867, population: 10000000 },
  { name: "Kolkata", country: "India", lat: 22.5726, lng: 88.3639, population: 15000000 },
  { name: "Chennai", country: "India", lat: 13.0827, lng: 80.2707, population: 11000000 },

  // Southeast Asia
  { name: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456, population: 35000000 },
  { name: "Kuala Lumpur", country: "Malaysia", lat: 3.1390, lng: 101.6869, population: 8000000 },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198, population: 6000000 },
  { name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018, population: 11000000 },
  { name: "Brunei", country: "Brunei", lat: 4.5353, lng: 114.7277, population: 400000 },

  // Africa
  { name: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357, population: 21000000 },
  { name: "Casablanca", country: "Morocco", lat: 33.5731, lng: -7.5898, population: 4000000 },
  { name: "Tunis", country: "Tunisia", lat: 36.8065, lng: 10.1815, population: 2300000 },
  { name: "Algiers", country: "Algeria", lat: 36.7372, lng: 3.0863, population: 3700000 },
  { name: "Lagos", country: "Nigeria", lat: 6.5244, lng: 3.3792, population: 15000000 },
  { name: "Khartoum", country: "Sudan", lat: 15.5007, lng: 32.5599, population: 6000000 },
  { name: "Dakar", country: "Senegal", lat: 14.7167, lng: -17.4677, population: 3500000 },
  { name: "Addis Ababa", country: "Ethiopia", lat: 9.1450, lng: 40.4897, population: 5000000 },

  // Europe
  { name: "London", country: "UK", lat: 51.5074, lng: -0.1278, population: 9500000 },
  { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522, population: 11000000 },
  { name: "Berlin", country: "Germany", lat: 52.5200, lng: 13.4050, population: 3700000 },
  { name: "Amsterdam", country: "Netherlands", lat: 52.3676, lng: 4.9041, population: 1100000 },
  { name: "Brussels", country: "Belgium", lat: 50.8503, lng: 4.3517, population: 1200000 },
  { name: "Stockholm", country: "Sweden", lat: 59.3293, lng: 18.0686, population: 1000000 },
  { name: "Oslo", country: "Norway", lat: 59.9139, lng: 10.7522, population: 700000 },

  // North America
  { name: "New York", country: "USA", lat: 40.7128, lng: -74.0060, population: 20000000 },
  { name: "Los Angeles", country: "USA", lat: 34.0522, lng: -118.2437, population: 13000000 },
  { name: "Chicago", country: "USA", lat: 41.8781, lng: -87.6298, population: 9500000 },
  { name: "Houston", country: "USA", lat: 29.7604, lng: -95.3698, population: 7000000 },
  { name: "Phoenix", country: "USA", lat: 33.4484, lng: -112.0740, population: 5000000 },
  { name: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832, population: 6500000 },
  { name: "Vancouver", country: "Canada", lat: 49.2827, lng: -123.1207, population: 2700000 },
  { name: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332, population: 22000000 },

  // South America
  { name: "São Paulo", country: "Brazil", lat: -23.5558, lng: -46.6396, population: 22000000 },
  { name: "Buenos Aires", country: "Argentina", lat: -34.6118, lng: -58.3960, population: 15000000 },
  { name: "Lima", country: "Peru", lat: -12.0464, lng: -77.0428, population: 11000000 },
  { name: "Bogotá", country: "Colombia", lat: 4.7110, lng: -74.0721, population: 11000000 },

  // East Asia
  { name: "Beijing", country: "China", lat: 39.9042, lng: 116.4074, population: 21000000 },
  { name: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737, population: 28000000 },
  { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503, population: 38000000 },
  { name: "Seoul", country: "South Korea", lat: 37.5665, lng: 126.9780, population: 25000000 },
  { name: "Manila", country: "Philippines", lat: 14.5995, lng: 120.9842, population: 25000000 },

  // Oceania
  { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093, population: 5000000 },
  { name: "Melbourne", country: "Australia", lat: -37.8136, lng: 144.9631, population: 5000000 },
  { name: "Auckland", country: "New Zealand", lat: -36.8485, lng: 174.7633, population: 1700000 },

  // Central Asia
  { name: "Tashkent", country: "Uzbekistan", lat: 41.2995, lng: 69.2401, population: 2500000 },
  { name: "Almaty", country: "Kazakhstan", lat: 43.2220, lng: 76.8512, population: 2000000 },
  { name: "Baku", country: "Azerbaijan", lat: 40.4093, lng: 49.8671, population: 2300000 },
];

// Color schemes for different regions
export const regionColors = {
  "Saudi Arabia": "#2E8B57", // Dark green for holy cities
  "UAE": "#4169E1",
  "Turkey": "#DC143C",
  "Iran": "#FF6347",
  "Pakistan": "#32CD32",
  "Bangladesh": "#228B22",
  "India": "#FF4500",
  "Indonesia": "#FF1493",
  "Malaysia": "#1E90FF",
  "Egypt": "#FFD700",
  "Morocco": "#FF0000",
  "Nigeria": "#00FF00",
  "UK": "#0000FF",
  "France": "#0000FF",
  "Germany": "#000000",
  "USA": "#FF0000",
  "Canada": "#FF0000",
  "Brazil": "#00FF00",
  "China": "#FF0000",
  "Japan": "#FF0000",
  "Australia": "#0000FF",
  default: "#667eea"
};

export const getColorForCountry = (country) => {
  return regionColors[country] || regionColors.default;
}; 