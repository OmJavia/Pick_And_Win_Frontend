import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import Navigation from '../components/NavigationBar';
import './ProductPage.css';
import BuyButton from '../components/BuyButton';
import Footer from '../components/Footer';
import Countdown from 'react-countdown';


function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    // Fetch product data on mount based on id
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const accessToken = localStorage.getItem('token');
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/getproductsbyid/${id}`,
                    {
                        headers: {
                            authorization: accessToken,
                        },
                    }
                );
                setProduct(response.data.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);


    return (
        <>
            <Navigation />
            <Container className="mt-4">
                <Row>
                    <Col sm={12} md={6}>
                        <img
                            src={`${process.env.REACT_APP_API_URL}${product.image_path}`}
                            alt={product.product_name}
                            className="product-image"
                        />
                    </Col>
                    <Col sm={12} md={6}>
                        <div className="product-info">
                            <h2>{product.product_name}</h2>
                            <p>{product.description || 'No description available'}</p>
                            <p>
                                <strong>Price:</strong> ₹ {product.product_price}
                            </p>
                            <p>
                                <strong>Quantity Available:</strong>{' '}
                                {product.ticket_quantity - product.sold_tickets}
                            </p>
                            <Countdown
                                date={new Date(product.draw_date)}
                                renderer={({ days, hours, minutes, seconds, completed }) => {
                                    if (completed) {
                                        return <span>Draw has started!</span>;
                                    } else {
                                        return (<>
                                            <span>Result out in: </span>
                                            <span style={{color:"red"}}>
                                                {days}d {hours}h {minutes}m {seconds}s
                                            </span></>
                                        );
                                    }
                                }}
                            />

                            <div className="ticket-selector mt-4">
                                {product.ticket_quantity - product.sold_tickets <= 0 ? (
                                    "Sold Out"
                                ) : (
                                    <BuyButton
                                        productId={id}
                                        amount={product.ticket_price}
                                        maxQuantity={product.ticket_quantity - product.sold_tickets} // Pass maxQuantity
                                    />
                                )}
                            </div>

                            <hr />
                            <div className='note' style={{ paddingInline: "50px" }}>NOTE: THIS IS A LUCKY DRAW ITEM. YOU MIGHT WIN or YOU MIGHT WIN NOTHING AT ALL. PARTICIPATE AND BUY AT YOUR OWN RISK.</div>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <h3 style={{ textAlign: "left" }}>HOW TO PLAY?</h3>
                        <ul className="how-to-play-list">
                            <li>Purchase a ticket to enter the game and qualify for prize draws.</li>
                            <li>Ticket sales close once all are sold or the purchase period ends.</li>
                            <li>
                                Winners are chosen randomly after the ticket purchase period closes.
                            </li>
                            <li>
                                More tickets increase your chances, but each ticket qualifies for one
                                win only.
                            </li>
                            <li>
                                Fair play is mandatory; any manipulation results in
                                disqualification.
                            </li>
                            <li>
                                Keep tickets safe and check winning numbers once results are
                                announced.
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}

export default ProductPage;
