import React, { useEffect, useState } from 'react';
import NavScrollExample from '../components/NavigationBar';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import LoginModal from '../components/Login';
import Footer from '../components/Footer';
import './Myorders.css'; 



function MyOrders() {
    const [orderlist, setOrderlist] = useState([]);
    const [totalTickets, setTotalTickets] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);

            const fetchOrders = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/myorder`, {
                        headers: {
                            'authorization': token,
                        },
                        params: {
                            page_no: currentPage,
                            page_size: pageSize,
                        },
                    });

                    const { orders, totalTickets } = response.data;
                    setOrderlist(orders);
                    setTotalTickets(totalTickets);
                    setTotalPages(Math.ceil(totalTickets / pageSize));
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            };

            fetchOrders();
        } else {
            setIsLoggedIn(false);
        }
    }, [currentPage, pageSize]);

    return (
        <>
            <NavScrollExample />
            <Container>
                {isLoggedIn ? (
                    <>
                    <br/>
                        <h1>Your Orders</h1>
                        <br/>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Serial Number</th>
                                    <th>Product Name</th>
                                    <th>Ticket Price</th>
                                    <th>Total Tickets Purchased</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderlist.length > 0 ? (
                                    orderlist.map((order, index) => (
                                        <tr key={index}>
                                            <td>{order}</td>
                                            <td>{order.product_name}</td>
                                            <td>{order.ticket_price}</td>
                                            <td>{order.total_tickets}</td>
                                            <td>{new Date(order.created_at).toLocaleString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No orders found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <div className="pagination-controls">
                            <Button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Previous
                            </Button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <Button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <h2>Please log in to view your orders</h2>
                        <LoginModal />
                    </div>
                )}
            </Container>
            <Footer />
        </>
    );
}

export default MyOrders;
