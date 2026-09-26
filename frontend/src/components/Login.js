import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const Login = ({ setUserName }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), password })
            });

            let data;
            try {
                data = await response.json();
            } catch {
                throw new Error('The server returned an invalid response. Please try again.');
            }

            if (!response.ok) {
                throw new Error(data.message || 'Login failed. Check your email and password.');
            }
            if (!data.token) {
                throw new Error('Login succeeded, but the server did not return an access token.');
            }

            localStorage.setItem('token', data.token);
            if (setUserName) setUserName(data.name || email.trim());
            navigate('/');
        } catch (requestError) {
            setError(requestError.message || 'Could not connect to the server. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="auth-card">
            <p className="eyebrow">WELCOME BACK</p>
            <h1>Pick up your flow.</h1>
            <p className="auth-copy">Log in to continue your typing practice and track your progress.</p>
            {location.state?.message && <p className="auth-success" role="status">{location.state.message}</p>}

            <form className="auth-form" onSubmit={handleSubmit}>
                <label htmlFor="login-email">Email</label>
                <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <label htmlFor="login-password">Password</label>
                <input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
                {error && <p className="auth-error" role="alert">{error}</p>}
                <button className="auth-submit" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Logging in…' : 'Log in'}
                </button>
            </form>

            <p className="auth-switch">New here? <Link to="/register">Create an account</Link></p>
        </main>
    );
};

export default Login;
