import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
                        <h1 className="hero-title">              🕌 Muslim Toolbox            </h1>
            <p className="hero-subtitle">
              Get accurate prayer times for any city worldwide and calculate your Zakat obligation.
              Stay connected with your Islamic duties no matter where you are.
            </p>
            <div className="hero-buttons">
              <Link to="/prayer-times" className="cta-button primary">
                Get Prayer Times
              </Link>
              <Link to="/zakat-calculator" className="cta-button primary">
                Calculate Zakat
              </Link>
              <a href="#features" className="cta-button secondary">
                Learn More
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="mosque-silhouette">
              <div className="minaret"></div>
              <div className="dome"></div>
              <div className="minaret"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">Why Choose Muslim Toolbox?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Worldwide Coverage</h3>
              <p>Get accurate prayer times for any city across the globe using reliable Islamic calculations.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Zakat Calculator</h3>
              <p>Calculate your Zakat obligation easily with our comprehensive calculator tool.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>Real-time Updates</h3>
              <p>Always up-to-date prayer times and current Nisab thresholds for accurate calculations.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Responsive</h3>
              <p>Perfect experience on desktop, tablet, and mobile devices wherever you are.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Privacy Focused</h3>
              <p>No personal data collection. Your information stays private and secure.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast & Reliable</h3>
              <p>Lightning-fast calculations powered by trusted Islamic sources and APIs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Stay Connected with Your Islamic Duties?</h2>
            <p>Join thousands of Muslims worldwide who trust our tools for their daily worship and charity calculations.</p>
            <div className="cta-buttons">
              <Link to="/prayer-times" className="cta-button primary large">
                Check Prayer Times
              </Link>
              <Link to="/zakat-calculator" className="cta-button primary large">
                Calculate Zakat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
                            <h3>🕌 Muslim Toolbox</h3>              <p>Bringing accurate Islamic prayer times and Zakat calculations to Muslims worldwide.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/prayer-times">Prayer Times</Link></li>
                <li><Link to="/zakat-calculator">Zakat Calculator</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Powered By</h4>
              <p>
                <a href="https://aladhan.com" target="_blank" rel="noopener noreferrer">
                  Aladhan API
                </a>
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Muslim Toolbox. May Allah accept our prayers and purify our wealth. Ameen. 🤲</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
