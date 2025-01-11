import React, { useEffect, useState } from 'react';
import { ProgressBar, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Home.css';
import NavigationBar from '../components/NavigationBar';
import axios from 'axios';
import Footer from '../components/Footer';
import Countdown from 'react-countdown';  // Import Countdown for timer functionality

function Home() {
    const [productsList, setProductsList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                console.log("REACT_APP_API_URL", process.env.REACT_APP_API_URL);
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/getproducts`);
                setProductsList(response.data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        loadProducts();
    }, []);

    const buyButton = (id) => {
        navigate(`product/${id}`);
    };

    return (
        <>
            <NavigationBar />
            <Container className="mt-3">
                <div className="product-grid">
                    {productsList.map((product) => {
                        const quantity = product.sold_tickets || 0;
                        const totalQuantity = product.ticket_quantity || 1;
                        const progressPercentage = Math.min((quantity / totalQuantity) * 100, 100);

                        return (
                            <div 
                                key={product.id} 
                                onClick={() => buyButton(product.id)}
                                className={`product-card ${progressPercentage >= 100 ? "disabled-card" : ""}`}
                            >
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/${product.image_path}`}
                                    alt={product.product_name}
                                    className="product-image"
                                />
                                <div className="product-details">
                                    <h5 className="product-title">{product.product_name}</h5>
                                    <p className="product-info">
                                        <strong>Price:</strong> ₹ {product.product_price} <br/>
                                        <strong>Ticket Cost:</strong> ₹ {product.ticket_price}
                                    </p>
                                    <p className="product-info">
                                    <strong>Quantity:</strong> {quantity}/{totalQuantity}
                                    </p>
                                <p className="product-info">
                                        <strong>Draw Time remaining:</strong> 
                                        <Countdown
                                            date={new Date(product.draw_date)} 
                                            renderer={({ days, hours, minutes, seconds, completed }) => {
                                                if (completed) {
                                                    return <span>Draw has started!</span>;
                                                } else {
                                                    return (
                                                        <span>
                                                            {days}d {hours}h {minutes}m {seconds}s
                                                        </span>
                                                    );
                                                }
                                            }}
                                        />
                                    </p>
                                    <ProgressBar
                                        now={progressPercentage}
                                        label={`${progressPercentage.toFixed(0)}%`}
                                        variant={progressPercentage >= 100 ? "success" : "info"}
                                    />
                                    <Button
                                        variant="outline-light"
                                        className="btn-buy"
                                        onClick={() => buyButton(product.id)}
                                        disabled={progressPercentage >= 100} // Disable button if progress is full
                                    >
                                        {progressPercentage >= 100 ? "Sold Out" : "Buy"} {/* Change button text */}
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="how-to-play mt-5">
                    <h3 className="section-title">HOW TO PLAY?</h3>
                    <ul className="instructions-list">
                        <li>Purchase a ticket to enter the game and qualify for prize draws.</li>
                        <li>Ticket sales close once all are sold or the purchase period ends.</li>
                        <li>Winners are chosen randomly after the ticket purchase period closes.</li>
                        <li>More tickets increase your chances, but each ticket qualifies for one win only.</li>
                        <li>Fair play is mandatory; any manipulation results in disqualification.</li>
                        <li>Keep tickets safe and check winning numbers once results are announced.</li>
                    </ul>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default Home;
