import React, { useState, useEffect, useCallback } from 'react';
import './style.css';

const ZakatCalculator = () => {
  // Asset state
  const [assets, setAssets] = useState({
    cash: '',
    goldSilver: '',
    businessInventory: '',
    investments: '',
    receivables: ''
  });

  // Debts state
  const [debts, setDebts] = useState('');

  // Nisab calculation type (gold or silver)
  const [nisabType, setNisabType] = useState('gold');

  // Calculated values
  const [results, setResults] = useState({
    totalAssets: 0,
    totalDebts: 0,
    zakatabWealth: 0,
    nisabThreshold: 0,
    meetsNisab: false,
    zakatDue: 0
  });

  // Current gold and silver prices (these would typically be fetched from an API)
  const goldPricePerGram = 65; // USD per gram (example price)
  const silverPricePerGram = 0.85; // USD per gram (example price)

  // Nisab thresholds
  const nisabGoldGrams = 87.48;
  const nisabSilverGrams = 612.36;

  // Handle asset input changes
  const handleAssetChange = (field, value) => {
    setAssets(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Calculate results using useCallback to prevent infinite loops
  const calculateZakat = useCallback(() => {
    // Parse and sum all assets
    const totalAssets = Object.values(assets).reduce((sum, value) => {
      const numValue = parseFloat(value) || 0;
      return sum + numValue;
    }, 0);

    // Parse debts
    const totalDebts = parseFloat(debts) || 0;

    // Calculate zakatable wealth (assets minus debts)
    const zakatabWealth = Math.max(0, totalAssets - totalDebts);

    // Calculate Nisab threshold based on selected type
    const nisabThreshold = nisabType === 'gold' 
      ? nisabGoldGrams * goldPricePerGram
      : nisabSilverGrams * silverPricePerGram;

    // Check if meets Nisab
    const meetsNisab = zakatabWealth >= nisabThreshold;

    // Calculate Zakat (2.5% if above Nisab)
    const zakatDue = meetsNisab ? zakatabWealth * 0.025 : 0;

    setResults({
      totalAssets,
      totalDebts,
      zakatabWealth,
      nisabThreshold,
      meetsNisab,
      zakatDue
    });
  }, [assets, debts, nisabType, goldPricePerGram, silverPricePerGram, nisabGoldGrams, nisabSilverGrams]);

  // Calculate results whenever inputs change
  useEffect(() => {
    calculateZakat();
  }, [calculateZakat]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const resetCalculator = () => {
    setAssets({
      cash: '',
      goldSilver: '',
      businessInventory: '',
      investments: '',
      receivables: ''
    });
    setDebts('');
  };

  return (
    <div className="zakat-calculator-page">
      <div className="container">
        <header className="page-header">
          <h1>💰 Zakat Calculator</h1>
          <p>Calculate your Zakat obligation according to Islamic principles</p>
        </header>

        <div className="calculator-container">
          <div className="calculator-form">
            {/* Nisab Selection */}
            <div className="nisab-selection">
              <h3>Nisab Calculation Base</h3>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="nisabType"
                    value="gold"
                    checked={nisabType === 'gold'}
                    onChange={(e) => setNisabType(e.target.value)}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-text">
                    Gold ({nisabGoldGrams}g = {formatCurrency(nisabGoldGrams * goldPricePerGram)})
                  </span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="nisabType"
                    value="silver"
                    checked={nisabType === 'silver'}
                    onChange={(e) => setNisabType(e.target.value)}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-text">
                    Silver ({nisabSilverGrams}g = {formatCurrency(nisabSilverGrams * silverPricePerGram)})
                  </span>
                </label>
              </div>
            </div>

            {/* Assets Section */}
            <div className="form-section">
              <h3>💼 Zakatable Assets</h3>
              <div className="input-grid">
                <div className="input-field">
                  <label htmlFor="cash">Cash & Bank Savings</label>
                  <input
                    type="number"
                    id="cash"
                    value={assets.cash}
                    onChange={(e) => handleAssetChange('cash', e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="input-field">
                  <label htmlFor="goldSilver">Gold & Silver Value</label>
                  <input
                    type="number"
                    id="goldSilver"
                    value={assets.goldSilver}
                    onChange={(e) => handleAssetChange('goldSilver', e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="input-field">
                  <label htmlFor="businessInventory">Business Inventory</label>
                  <input
                    type="number"
                    id="businessInventory"
                    value={assets.businessInventory}
                    onChange={(e) => handleAssetChange('businessInventory', e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="input-field">
                  <label htmlFor="investments">Investments & Stocks</label>
                  <input
                    type="number"
                    id="investments"
                    value={assets.investments}
                    onChange={(e) => handleAssetChange('investments', e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="input-field">
                  <label htmlFor="receivables">Money Owed to You</label>
                  <input
                    type="number"
                    id="receivables"
                    value={assets.receivables}
                    onChange={(e) => handleAssetChange('receivables', e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            {/* Debts Section */}
            <div className="form-section">
              <h3>📋 Deductible Debts (Optional)</h3>
              <div className="input-field">
                <label htmlFor="debts">Total Outstanding Debts</label>
                <input
                  type="number"
                  id="debts"
                  value={debts}
                  onChange={(e) => setDebts(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                <small>Include credit cards, loans, and other immediate debts</small>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button type="button" onClick={resetCalculator} className="reset-btn">
                Reset Calculator
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="results-container">
            <h3>📊 Zakat Calculation Results</h3>
            
            <div className="results-grid">
              <div className="result-card">
                <div className="result-label">Total Assets</div>
                <div className="result-value">{formatCurrency(results.totalAssets)}</div>
              </div>

              <div className="result-card">
                <div className="result-label">Total Debts</div>
                <div className="result-value">{formatCurrency(results.totalDebts)}</div>
              </div>

              <div className="result-card highlight">
                <div className="result-label">Zakatable Wealth</div>
                <div className="result-value">{formatCurrency(results.zakatabWealth)}</div>
              </div>

              <div className="result-card">
                <div className="result-label">Nisab Threshold ({nisabType})</div>
                <div className="result-value">{formatCurrency(results.nisabThreshold)}</div>
              </div>

              <div className={`result-card status ${results.meetsNisab ? 'meets-nisab' : 'below-nisab'}`}>
                <div className="result-label">Nisab Status</div>
                <div className="result-value">
                  {results.meetsNisab ? '✅ Above Nisab' : '❌ Below Nisab'}
                </div>
              </div>

              <div className={`result-card zakat-due ${results.zakatDue > 0 ? 'has-zakat' : 'no-zakat'}`}>
                <div className="result-label">Zakat Due (2.5%)</div>
                <div className="result-value">{formatCurrency(results.zakatDue)}</div>
              </div>
            </div>

            {results.zakatDue > 0 && (
              <div className="zakat-guidance">
                <h4>🤲 Your Zakat Obligation</h4>
                <p>
                  You are required to pay <strong>{formatCurrency(results.zakatDue)}</strong> in Zakat.
                  This should be paid to eligible recipients as outlined in Islamic guidelines.
                </p>
                <div className="guidance-note">
                  <small>
                    Note: This calculation is based on current values. Consult with an Islamic scholar 
                    for specific circumstances and ensure you've held these assets for a full lunar year.
                  </small>
                </div>
              </div>
            )}

            {results.zakatabWealth > 0 && !results.meetsNisab && (
              <div className="below-nisab-info">
                <h4>📝 Below Nisab Threshold</h4>
                <p>
                  Your zakatable wealth is below the Nisab threshold. 
                  You need an additional <strong>{formatCurrency(results.nisabThreshold - results.zakatabWealth)}</strong> 
                  to reach the minimum amount for Zakat obligation.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="info-section">
          <h3>ℹ️ About Zakat</h3>
          <div className="info-grid">
            <div className="info-card">
              <h4>What is Zakat?</h4>
              <p>Zakat is one of the Five Pillars of Islam, a form of worship through charitable giving that purifies wealth and helps those in need.</p>
            </div>
            <div className="info-card">
              <h4>Who Must Pay?</h4>
              <p>Muslims who possess wealth above the Nisab threshold for a full lunar year (Hawl) are obligated to pay Zakat.</p>
            </div>
            <div className="info-card">
              <h4>Nisab Threshold</h4>
              <p>The minimum amount of wealth required before Zakat becomes obligatory, equivalent to 87.48g of gold or 612.36g of silver.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculator; 