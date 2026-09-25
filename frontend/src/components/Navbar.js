import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Check if user is logged in

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token
        navigate('/login'); // Redirect to login page
        window.location.reload(); // Refresh to update navbar UI
    };

    return (
        <nav style={{ padding: '15px', background: '#333', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Link to="/" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Typing Test</Link>
            
            {token ? (
                /* Shows only if user is logged in */
                <>
                    <Link to="/dashboard" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Dashboard</Link>
                    <button onClick={handleLogout} style={{ background: 'red', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer', borderRadius: '5px', marginLeft: '15px' }}>Logout</button>
                </>
            ) : (
                /* Shows only if user is logged out */
                <>
                    <Link to="/login" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Login</Link>
                    <Link to="/register" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Register</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;