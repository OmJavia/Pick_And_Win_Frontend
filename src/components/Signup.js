import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function SignupModal() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
  
    const handleClose = () => setShow(false);
    const handleShow = () => {
      setError(null); // Clear error on modal open
      setShow(true);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
          name,
          email,
          password,
        });
        console.log(response,"<=======================")
      
    
        handleClose(); // Close the modal on success
     
    };
    
    
  
    return (
      <>
        <Button variant="light" onClick={handleShow}>
          Signup
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Register to Continue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <p className="text-danger">{error}</p>} {/* Display error */}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
  
              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
  
              <Button variant="primary" type="submit" className="mt-3">
                Signup
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }

export default SignupModal
