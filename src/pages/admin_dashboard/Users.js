import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Spinner, Alert, Container } from 'react-bootstrap';

function Users() {
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
                setUsersData(response.data.data);
            } catch (err) {
                setError("Failed to load users. Please try again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const deleteUser = async (id) => {
        if (!window.confirm(`Are you sure you want to delete the user with ID ${id}?`)) {
            return;
        }

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/deleteuserbyid/${id}`);
            setUsersData(usersData.filter((user) => user.id !== id));
        } catch (err) {
            console.error("Error deleting user:", err);
            alert("Failed to delete user. Please try again.");
        }
    };

    return (
        <Container style={{ marginTop: '20px' }}>
            <h1 className="mb-4">User List</h1>

            {loading && (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading users...</p>
                </div>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && !error && usersData.length === 0 && (
                <Alert variant="info">No users found.</Alert>
            )}

            {!loading && usersData.length > 0 && (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.user_name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default Users;
