import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './Paymentfailed.css';

function Paymentfailed() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get('order_id');

  return (
    <div className="payment-failed-container">
      <div className="card">
        <div className="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="Red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>

        </div>
        <h1 className="failed-title">Refund Initiated</h1>
        <p className="failed-message">Your refund has been initiated and will be credited to your account within 7 working days. Thank you for your patience.</p>

        {orderId && (<p className="order-id">Order ID: <span>{orderId}</span></p>)}
        <br/>
        <button className="order-more-button" onClick={() => navigate('/')}>
          Explore More Tickets
        </button>
      </div>
    </div>
  );
}

export default Paymentfailed;
