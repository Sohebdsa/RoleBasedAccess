import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import CartSidebar from "../components/CartSidebar";
import "./UserPage.css";

export default function UserPage() {
    const { user, logout } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = "http://localhost:8080/api/products";

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (data.success) {
                setProducts(data.data.filter(p => p.status === "active"));
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    };

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

    return (
        <>
            <Navbar />
            <CartSidebar />
            <div className="user-page">
                {products.length === 0 ? (
                    <p className="no-products">No products available at the moment.</p>
                ) : (
                    <div className="products-grid">
                        {products.map((product) => (
                            <div key={product._id} className="product-card">
                                <div className="product-image">
                                    {product.image ? (
                                        <img
                                            src={`http://localhost:8080${product.image}`}
                                            alt={product.name}
                                        />
                                    ) : (
                                        <div className="no-image">No Image</div>
                                    )}
                                </div>

                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-category">{product.category}</p>
                                    <p className="product-description">{product.description}</p>

                                    <div className="product-footer">
                                        <div className="product-price">₹{product.price}</div>
                                        <div className="product-stock">
                                            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                                        </div>
                                    </div>

                                    <button
                                        className="add-to-cart-btn"
                                        onClick={() => handleAddToCart(product)}
                                        disabled={product.stock === 0}
                                    >
                                        {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
