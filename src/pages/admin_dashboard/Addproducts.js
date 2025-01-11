import React from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { Formik, Field, Form as FormikForm } from 'formik';
import './Addproducts.css';


function Addproducts() {
  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('name', values.name); // Backend expects 'name'
    formData.append('price', values.price); // Backend expects 'price'
    formData.append('ticket_quantity', values.ticket_quantity);
    formData.append('ticket_price', values.ticket_price);
    formData.append('image', values.image); // Backend expects 'image'
    formData.append('draw_date', values.draw_date); // Append draw date


    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/addproducts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Product Added Successfully');
        resetForm(); // Reset the form
      }
    } catch (error) {
      alert('Failed to Add Product. Please try again.');
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <Container className='add-products'>
      <h1 className="text-center">Add Products</h1>
      <Formik
        initialValues={{
          name: '', // Match the backend expected key
          price: '', // Match the backend expected key
          ticket_quantity: '',
          ticket_price: '',
          image: null,
          draw_date: '', // Add draw_date field here

        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <FormikForm>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Product Name</Form.Label>
                <Field
                  name="name" // Match backend key
                  type="text"
                  placeholder="Enter Product Name"
                  className="form-control"
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Product Price</Form.Label>
                <Field
                  name="price" // Match backend key
                  type="text"
                  placeholder="Enter Product Price"
                  className="form-control"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Ticket Quantity</Form.Label>
                <Field
                  name="ticket_quantity"
                  type="number"
                  placeholder="Enter Ticket Quantity"
                  className="form-control"
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Ticket Price</Form.Label>
                <Field
                  name="ticket_price"
                  type="text"
                  placeholder="Enter Ticket Price"
                  className="form-control"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Product Image</Form.Label>
                <input
                  name="image"
                  type="file"
                  className="form-control"
                  onChange={(event) => setFieldValue('image', event.currentTarget.files[0])}
                />
              </Form.Group>
            </Row>


            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Draw Date</Form.Label>
                <Field
                  name="draw_date" // Match backend key
                  type="date" // Date input type
                  className="form-control"
                />
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </FormikForm>
        )}
      </Formik>
    </Container>
  );
}

export default Addproducts;
