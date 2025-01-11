import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Userdropdown.css'
import { useNavigate } from 'react-router-dom';

function UserDropdown() {
   const logout=()=>{
    localStorage.clear();
    window.location.reload();
    }
    const navigate = useNavigate();
    const handleViewOrders = () => {
        navigate('/myorders'); // Navigate directly to /myorders
    };

 
    return (
        <Navbar expand="sm" >
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto"> {/* Align to the right */}
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title={
                                <span className="user-icon">
                                    <FontAwesomeIcon icon={faUser} style={{ color: "white" }} />
                                </span>
                            }
                            menuVariant="dark"
                            align="end" 
                        >
                            {/* <NavDropdown.Item href="#profile">Profile</NavDropdown.Item> */}
                            <NavDropdown.Item onClick={handleViewOrders}>My Orders</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logout} >Logout</NavDropdown.Item>
                        </NavDropdown>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default UserDropdown;
