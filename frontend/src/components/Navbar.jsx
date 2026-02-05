import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import "./Navbar.css";

const Navbar = () => {
    const { user, logout } = useAuth();
    const { getCartCount, toggleCart } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <h2>NexCore Alliance</h2>
                    {user && (
                        <span className="navbar-role">
                            {user.role === "admin" ? "Admin Panel" : "User Dashboard"}
                        </span>
                    )}
                </div>

                {user && (
                    <div className="navbar-user">
                        {user.role === "user" && (
                            <button className="cart-icon-btn" onClick={toggleCart}>
                                <ShoppingCartIcon />
                                {getCartCount() > 0 && (
                                    <span className="cart-badge">{getCartCount()}</span>
                                )}
                            </button>
                        )}
                        <span className="navbar-username">
                            <PersonIcon style={{ position: "relative", top: "6px" }} /> {user.username}
                        </span>
                        <button onClick={handleLogout} className="navbar-logout-btn">
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
