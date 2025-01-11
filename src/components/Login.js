import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import UserDropdown from './Userdropdown'; // Import the UserDropdown component
import './Login.css'; // Import your CSS file

function LoginModal() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign-up
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    setError(null);
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        // API for Sign-up
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
          name,
          email,
          password,
        });

        if (response.status === 200) {
          alert('Sign-up successful! Please log in.');
          setIsSignUp(false); // Switch back to login after successful sign-up
        }
      } else {
        // API for Login
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
          email,
          password,
        });
        const userData = response.data.data[0]; // Extract user details
        console.log('User Details:', userData);
        localStorage.setItem('token', userData.token); // Save token to localStorage
        alert(`Welcome, ${userData.user_name}!`);
        setIsLoggedIn(true); // Set login state to true
        window.location.reload(); 
      }
      handleClose(); // Close modal on success
    } catch (error) {
      setError(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setName('');
    setEmail('');
    setPassword('');
    setError(null);
  };

  return (
    <>
      {isLoggedIn ? (
        <UserDropdown /> // Show UserDropdown if logged in
      ) : (
        <Button variant="success" onClick={handleShow}>
          {isSignUp ? 'Sign Up' : 'Login'}
        </Button>
      )}

<Modal className="login-modal" show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>
      {isSignUp ? 'Create an Account' : 'Login to Continue'}
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {error && <p className="text-danger">{error}</p>}
    <Form onSubmit={handleSubmit}>
      {isSignUp && (
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
      )}
      <Form.Group controlId="formEmail" className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <div className="d-flex justify-content-between mt-3">
        <Button variant="primary" type="submit">
          {isSignUp ? 'Sign Up' : 'Login'}
        </Button>
        <Button variant="outline-secondary" onClick={toggleForm}>
          {isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
        </Button>
      </div>
    </Form>
  </Modal.Body>
</Modal>

    </>
  );
}

export default LoginModal;
