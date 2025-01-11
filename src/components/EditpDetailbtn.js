import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "./EditpDetailbtn.css";

function EditpDetailModal({ id, show, onHide }) {
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    ticket_quantity: "",
    ticket_price: "",
    draw_date: "",
    image: null,
  });

  useEffect(() => {
    if (show && id) {
      const fetchProductDetails = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/getproductsbyid/${id}`);
          const data = response.data.data;
          setProductDetails(data);

          // Pre-fill form data
          setFormData({
            name: data.product_name || "",
            price: data.product_price || "",
            ticket_quantity: data.ticket_quantity || "",
            ticket_price: data.ticket_price || "",
            draw_date: data.draw_date || "",
            image: null,
          });
        } catch (error) {
          console.error("Error fetching product details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProductDetails();
    }
  }, [id, show]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads and other data
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("ticket_quantity", formData.ticket_quantity);
    data.append("ticket_price", formData.ticket_price);
    data.append("draw_date", formData.draw_date);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/updateproduct/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Product updated successfully!");
        onHide();
      }
    } catch (error) {
      alert("Failed to update product. Please try again.");
      console.error("Error updating product:", error.response?.data || error.message);
    }
  };

  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "black" }}>
          {loading ? "Loading..." : `Edit Product: ${productDetails.product_name}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading details...</p>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Enter Product Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  name="price"
                  type="number"
                  placeholder="Enter Product Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Ticket Quantity</Form.Label>
                <Form.Control
                  name="ticket_quantity"
                  type="number"
                  placeholder="Enter Ticket Quantity"
                  value={formData.ticket_quantity}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Ticket Price</Form.Label>
                <Form.Control
                  name="ticket_price"
                  type="number"
                  placeholder="Enter Ticket Price"
                  value={formData.ticket_price}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Draw Date</Form.Label>
                <Form.Control
                  name="draw_date"
                  type="date"
                  value={formData.draw_date}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Product Image</Form.Label>
                <Form.Control
                  name="image"
                  type="file"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Update Product
            </Button>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function EditpDetailbtn({ id }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <Button variant="info" size="md" onClick={() => setModalShow(true)}>
        Edit Product
      </Button>
      <EditpDetailModal id={id} show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default EditpDetailbtn;
