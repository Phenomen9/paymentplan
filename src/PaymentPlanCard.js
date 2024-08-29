import React, { useState } from 'react';
import './PaymentPlanCard.css';
import './Dropdown2.css';
import visa from "./visa.png"
import unionpay from "./unionpay.png"
import amex from "./amex.png"
import mastercard from "./mastercard.png"

console.log("image:::", visa);
console.log("image:::",unionpay );
console.log("image:::",mastercard);
console.log("image:::",amex );



const PaymentPlanCard = () => {
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedCountry, setSelectedCountry] = useState('Indonesia');
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(''); // New state for selected bank
  const [bankDropdownOpen, setBankDropdownOpen] = useState(false); // Manage dropdown state

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
    setSelectedBank(''); // Reset bank selection
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
    setBankDropdownOpen(false); // Close the bank dropdown on country change
  };

  // Function to handle bank selection
  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setBankDropdownOpen(false); // Close dropdown after selection
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
          Card<span><img src='' alt=''/></span>
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
          <h3>Credit card details</h3>
          <input type="text" placeholder="0000 0000 0000 0000" />
          <div classname="card-logos">
          <img src={mastercard} alt="mastercard-logo"/>
          <img src={amex} alt="amex-logo"/>
    <img src={unionpay} alt="union-logo"/>
    <img src={visa} alt="visa-logo"/>

  </div>

          <div className="card-info">
            <input type="text" placeholder="MM / YYYY" />
            <input type="text" placeholder="CVC" />
          </div>
          <h6>By providing your card information, you allow us to charge your card for future payments in accordance with their terms.</h6>
        </div>
      )}

      {paymentMethod === 'bank' && (
        <div className="bank-transfer-details">
          <h3>Country</h3>
          <select className="country-dropdown" value={selectedCountry} onChange={handleCountryChange}>
            <option value="Indonesia">Indonesia</option>
            <option value="USA">USA</option>
            <option value="Nigeria">Nigeria</option>
          </select>

          {banks.length > 0 && (
            <div className="bank-options">
            
              <div>
                <button onClick={() => setBankDropdownOpen(!bankDropdownOpen)}>
                  {selectedBank || 'Select a bank'}
                </button>
                {bankDropdownOpen && (
                  <ul className="bank-dropdown">
                    {banks.map((bank, index) => (
                      <li key={index} onClick={() => handleBankSelect(bank)}>
                        {bank}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {paymentMethod === 'card' && (
        <div className="billing-address">
          <h3>Billing address</h3>
          <select className="country-dropdown" value={selectedCountry} onChange={handleCountryChange}>
            <option value="Indonesia">Indonesia</option>
            <option value="USA">USA</option>
            <option value="Nigeria">Nigeria</option>
          </select>
          <input type="text" placeholder="Postal code" />
        </div>
      )}

      <div className="discount-code">
        <h3>Discount code</h3>
        <input type="text" placeholder="Input discount code here" />
      </div>

      <div className="price-details">
        <p>Price:</p>
        <span>${totalDue + discount}</span>
      </div>
      <div className="price-details">
        <p>Discount:</p>
        <span>-${discount}</span>
      </div>
      <div className="price-details total-due">
        <p>Total due:</p>
        <span>${totalDue}</span>
      </div>

      <button className="upgrade-button">Upgrade to Premium</button>
    </div>
  );
};

export default PaymentPlanCard;
