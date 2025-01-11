

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Editproducts.css';
import { useNavigate } from 'react-router-dom';
import EditpDetailbtn from '../../components/EditpDetailbtn';

function Editproducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/getproducts`);
                setProducts(response.data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/deleteproducts/${id}`);
            setProducts(products.filter(product => product.id !== id));
            alert("Product deleted successfully!");
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product. Please try again.");
        }
    };

    if (loading) {
        return <div className="edit-products-loading">Loading...</div>;
    }

    return (
        <div className="edit-products-container">
            <h1 className="edit-products-title">Manage Your Products</h1>
            <div className="edit-products-row">
                {products.map((product) => (
                    <div key={product.id} className="edit-products-col">
                        <div className="edit-products-card">
                            <img 
src={`${process.env.REACT_APP_API_URL}${product.image_path}`}
className="edit-products-card-img-top" 
                                alt={product.product_name} 
                            />
                            <div className="edit-products-card-body">
                                <h5 className="edit-products-card-title">{product.product_name}</h5>
                                <button
                                    className="edit-products-btn-danger"
                                    onClick={() => deleteProduct(product.id)}
                                >
                                    Delete Product
                                </button>
                                <br />
                                <br />
                                <EditpDetailbtn id={product.id} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Editproducts;
