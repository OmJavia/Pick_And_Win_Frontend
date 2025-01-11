import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
    const [totalProducts, setTotalProducts] = useState(0); // State for total products
    const [totalUsers, setTotalUsers] = useState(0); // State for total users
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(""); // Error state

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                // Fetch total products
                const productsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/getproducts`);
                setTotalProducts(productsResponse.data.total);

                // Fetch total users
                const usersResponse = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
                setTotalUsers(usersResponse.data.data.length); // Assuming users array is returned in `data.data`
            } catch (err) {
                setError("Failed to fetch dashboard statistics. Please try again.");
                console.error("Error fetching dashboard stats:", err);
            } finally {
                setLoading(false); // Set loading to false after both API calls
            }
        };

        fetchDashboardStats();
    }, []); // Run once on component mount

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator
    }

    if (error) {
        return <div>{error}</div>; // Show error message if fetching fails
    }

    return (
        <div>
            <h1>Welcome to Dashboard</h1>
            <h2>Total Products: {totalProducts}</h2> {/* Display total products */}
            <h2>Total Users: {totalUsers}</h2> {/* Display total users */}
        </div>
    );
}

export default Dashboard;
