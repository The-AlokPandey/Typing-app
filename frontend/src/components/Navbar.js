import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Check if user is logged in

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token
        navigate('/login'); // Redirect to login page
        window.location.reload(); // Refresh to update navbar UI
    };

    return (
        <nav className="site-nav" aria-label="Main navigation">
            <NavLink to="/" end>Practice</NavLink>
            
            {token ? (
                <>
                    <NavLink to="/dashboard">Progress</NavLink>
                    <button onClick={handleLogout} className="nav-logout" type="button">Log out</button>
                </>
            ) : (
                <>
                    <NavLink to="/login">Log in</NavLink>
                    <NavLink to="/register">Sign up</NavLink>
                </>
            )}
        </nav>
    );
};

export default Navbar;