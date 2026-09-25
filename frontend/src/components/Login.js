import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/'); 
                window.location.reload(); 
            } else {
                alert(data.message || "Login failed!");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="typing-container" style={{ maxWidth: '400px' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                <input 
                    type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required 
                    style={inputStyle}
                />
                <input 
                    type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required 
                    style={inputStyle}
                />
                <button type="submit" style={btnStyle}>Login</button>
            </form>
        </div>
    );
};

const inputStyle = { padding: '15px', borderRadius: '8px', border: '2px solid #3f3f5a', background: '#2a2a35', color: '#fff', fontSize: '16px', outline: 'none' };
const btnStyle = { padding: '12px', borderRadius: '8px', border: 'none', background: '#00ffcc', color: '#121212', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };

export default Login;