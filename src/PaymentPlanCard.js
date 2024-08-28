import React, { useState } from 'react';
import './PaymentPlanCard.css';

const PaymentPlanCard = () => {
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedCountry, setSelectedCountry] = useState('Indonesia');
  const [banks, setBanks] = useState([]);

  // Prices for yearly and monthly plans
  const yearlyPrice = 120;
  const monthlyPrice = 12;
  const yearlyDiscount = 24;

  // Calculate total due based on the selected plan
  const totalDue = selectedPlan === 'yearly' ? yearlyPrice : monthlyPrice;
  const discount = selectedPlan === 'yearly' ? yearlyDiscount : 0;

  // Function to handle country change and update banks
  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    // Update bank options based on selected country
    if (country === 'Indonesia') {
      setBanks(['Bank Central Asia (BCA)', 'Bank Rakyat Indonesia (BRI)', 'Bank Negara Indonesia (BNI)', 'Bank Mandiri (Mandiri)']);
    } else if (country === 'USA') {
      setBanks(['Bank of America', 'Chase Bank', 'Wells Fargo', 'CitiBank']);
    } else if (country === 'Nigeria') {
      setBanks(['Stanbic', 'EcoBank', 'GTB', 'Sterling']);
    } else {
      setBanks([]);
    }
  };

  return (
    <div className="card-container">
      <div className="plan-selection">
        <h3>Choose your plan</h3>
        <label className={`plan-box ${selectedPlan === 'yearly' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="plan"
            checked={selectedPlan === 'yearly'}
            onChange={() => setSelectedPlan('yearly')}
          />
          <span className="plan-type">Yearly</span>
          <span className="plan-details">
            <span className="discount">-16%</span> ${yearlyPrice}/year
          </span>
        </label>
        <label className={`plan-box ${selectedPlan === 'monthly' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="plan"
            checked={selectedPlan === 'monthly'}
            onChange={() => setSelectedPlan('monthly')}
          />
          <span className="plan-type">Monthly</span>
          <span className="plan-details">${monthlyPrice}/month</span>
        </label>
      </div>

      <div className="payment-method">
        <button
          className={paymentMethod === 'card' ? 'active' : ''}
          onClick={() => setPaymentMethod('card')}
        >
          Card
        </button>
        <button
          className={paymentMethod === 'bank' ? 'active' : ''}
          onClick={() => setPaymentMethod('bank')}
        >
          Bank Transfer
        </button>
      </div>

      {paymentMethod === 'card' && (
        <div className="card-details">
          <input type="text" placeholder="0000 0000 0000 0000" />
          <div className="card-info">
            <input type="text" placeholder="MM / YYYY" />
            <input type="text" placeholder="CVC" />
          </div>
        </div>
      )}

      {paymentMethod === 'bank' && (
        <div className="bank-transfer-details">
          <select className="country-dropdown" value={selectedCountry} onChange={handleCountryChange}>
            <option value="Indonesia">Indonesia</option>
            <option value="USA">USA</option>
            <option value="Nigeria">Nigeria</option>
            {/* Add more countries as needed */}
          </select>

          {banks.length > 0 && (
            <div className="bank-options">
              {banks.map((bank, index) => (
                <label key={index}>
                  <input type="radio" name="bank" /> {bank}
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="billing-address">
      
        <input type="text" placeholder="Postal code" />
      </div>

      <div className="discount-code">
        <input type="text" placeholder="Input discount code here" />
        <button>Cancel</button>
      </div>

      <div className="price-details">
        <p>Price:</p>
        <span>${totalDue + discount}</span>
      </div>
      <div className="price-details">
        <p>Discount:</p>
        <span>-${discount}</span>
      </div>
      <div className="price-details">
        <p>Total due:</p>
        <span>${totalDue}</span>
      </div>

      <button className="upgrade-button">Upgrade to Premium</button>
    </div>
  );
};

export default PaymentPlanCard;
