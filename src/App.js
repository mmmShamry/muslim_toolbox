import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './views/Home';
import PrayerTime from './views/PrayerTime';
import ZakatCalculator from './views/ZakatCalculator';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prayer-times" element={<PrayerTime />} />
            <Route path="/zakat-calculator" element={<ZakatCalculator />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
