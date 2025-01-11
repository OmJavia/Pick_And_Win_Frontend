import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

function Payment() {
  const location = useLocation(); // Retrieve data passed via navigation
  const navigate = useNavigate();

  const { product_id, quantity } = location.state || { product_id: null, quantity: 1 };

  // Handle Confirm Button Click
  const handleConfirm = async () => {
    try {
      const accessToken = localStorage.getItem('token');

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/buyticket`,
        { product_id, quantity }, // Pass product_id and quantity
        {
          headers: {
            'Authorization': accessToken, // Authorization header
          },
        }
      );

      if (response.status === 200) {
        alert(`Payment Successful! Response: ${JSON.stringify(response.data)}`);
        navigate('/'); // Navigate back to home or another page after success
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <>
      <Container className="text-center mt-4">
        <h1>Payment</h1>
        <h2>Please confirm your purchase</h2>
        <h3>Product ID: {product_id}</h3>
        <h3>Quantity of tickets: {quantity}</h3>

        <div className="mt-4">
          <Button variant="success" onClick={handleConfirm} className="mx-2">
            Confirm
          </Button>
          <Button variant="danger" onClick={handleCancel} className="mx-2">
            Cancel
          </Button>
        </div>
      </Container>
    </>
  );
}

export default Payment;
