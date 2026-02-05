import { useCart } from "../context/CartContext";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "./CartSidebar.css";

const CartSidebar = () => {
    const { cartItems, isCartOpen, toggleCart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    return (
        <>
            {/* Overlay */}
            {isCartOpen && <div className="cart-overlay" onClick={toggleCart}></div>}

            {/* Sidebar */}
            <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>Shopping Cart</h2>
                    <button className="close-btn" onClick={toggleCart}>
                        <CloseIcon />
                    </button>
                </div>

                <div className="cart-content">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="cart-item">
                                        <div className="cart-item-image">
                                            {item.image ? (
                                                <img
                                                    src={`http://localhost:8080${item.image}`}
                                                    alt={item.name}
                                                />
                                            ) : (
                                                <div className="no-image">No Image</div>
                                            )}
                                        </div>

                                        <div className="cart-item-details">
                                            <h4>{item.name}</h4>
                                            <p className="cart-item-price">₹{item.price}</p>

                                            <div className="quantity-controls">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                    className="quantity-btn"
                                                >
                                                    <RemoveIcon fontSize="small" />
                                                </button>
                                                <span className="quantity">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                    className="quantity-btn"
                                                    disabled={item.quantity >= item.stock}
                                                >
                                                    <AddIcon fontSize="small" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="cart-item-actions">
                                            <p className="item-total">₹{(item.price * item.quantity).toFixed(2)}</p>
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="remove-btn"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-footer">
                                <div className="cart-total">
                                    <span>Total:</span>
                                    <span className="total-amount">₹{getCartTotal().toFixed(2)}</span>
                                </div>
                                <button className="checkout-btn">Proceed to Checkout</button>
                                <button className="clear-cart-btn" onClick={clearCart}>
                                    Clear Cart
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartSidebar;
