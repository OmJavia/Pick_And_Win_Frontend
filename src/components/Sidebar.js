import React from "react";
import { Link } from "react-router-dom";
import './Sidebar.css';

function Sidebar({ children }) {
    return (
        <div className="sidebar-container">
            <div className="sidebar">
                <h4>Admin Dashboard</h4>
                <ul>
                    <li>
                        <Link to="/" >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin" >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/addproduct">
                            Add Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/editproduct">
                            Edit Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/users">
                            Users
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="content">{children}</div>
        </div>
    );
}

export default Sidebar;
