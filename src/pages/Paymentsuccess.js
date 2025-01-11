import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './Paymentsuccess.css';

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get('order_id');

  return (
    <div className="payment-success-container">
      <div className="card">
        <div className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle">
            <path d="M9 12l2 2 4-4"></path>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        </div>
        <h1 className="success-title">Payment Successful!</h1>
        <p className="success-message">Thank you for your purchase.</p>
        {orderId && (<p className="order-id">Order ID: <span>{orderId}</span></p>)}
        <br/>
        <button className="order-more-button" onClick={() => navigate('/')}>
          Order More Tickets
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
