import React, { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import LoginModal from './Login';
import axios from 'axios';

function BuyButton({ productId, maxQuantity ,amount}) {
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1); 


  const handleClose = () => setShow(false);

  const handleIncrement = () => {
    if (quantity < maxQuantity) { // Ensure it doesn't exceed maxQuantity
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  
  const checkoutHandler = async (amount) => {
  
    if (typeof amount !== "number") {
      console.error("Invalid amount type:", typeof amount);
      return;
    }
  
    try {
      const token = localStorage.getItem('token'); // Check for token
    if (!token) {
      alert("Please login to continue");
    }
    const totalAmount = amount * quantity;
    const {data : {key}} = await axios.get(`${process.env.REACT_APP_API_URL}/getkey`)
    var response = await axios.post(`${process.env.REACT_APP_API_URL}/checkout`, {
        amount: totalAmount, 
        quantity: quantity,
        product_id: productId
    },
    {
       headers: { Authorization: token } 
      }
  )
    console.log(response.data.order)
    console.log(key, "<==")
    const options = {
        key,
        amount: response.data.order.amount, 
        currency: "INR",
        name: "Pick And Win",
        description: "Test Transaction",
        image: "http://pluspng.com/img-png/user-png-icon-young-user-icon-2400.png",
        order_id: response.data.order.id, 
        callback_url: `${process.env.REACT_APP_API_URL}/paymentVerification`,
        prefill: {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#3399cc"
        }
    };
    console.log("Opening Razorpay Checkout with options:", options);
    const razor = new window.Razorpay(options);
    razor.open();

    }
  
  catch (error) {
    console.error(error);
  }
};

  return (
    <>
      <Container className="text-center mt-4">
        <h1>Quantity of tickets:</h1>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <Button variant="danger" onClick={handleDecrement} className="mx-2">
            -
          </Button>
          <span style={{ fontSize: '1.5rem', minWidth: '50px' }}>{quantity}</span>
          <Button variant="success" onClick={handleIncrement} className="mx-2">
            +
          </Button>
        </div>

        <Button variant="primary" onClick={() => checkoutHandler(amount)}>
          BUY 
        </Button>
      </Container>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:"black"}} >You have to login for purchase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginModal />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default BuyButton;
