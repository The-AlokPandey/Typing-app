import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    password
                })
            });

            let data;
            try {
                data = await response.json();
            } catch {
                throw new Error('The server returned an invalid response. Please try again.');
            }

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed. Please try again.');
            }

            navigate('/login', { state: { message: 'Your account is ready. Log in to start practicing.' } });
        } catch (requestError) {
            setError(requestError.message || 'Could not connect to the server. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="auth-card">
            <p className="eyebrow">START YOUR STREAK</p>
            <h1>Make room for flow.</h1>
            <p className="auth-copy">Create an account to practice at your pace and keep an eye on your progress.</p>

            <form className="auth-form" onSubmit={handleSubmit}>
                <label htmlFor="register-name">Name</label>
                <input
                    id="register-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
                <label htmlFor="register-email">Email</label>
                <input
                    id="register-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <label htmlFor="register-password">Password</label>
                <input
                    id="register-password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Choose a password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
                {error && <p className="auth-error" role="alert">{error}</p>}
                <button className="auth-submit" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating account…' : 'Create account'}
                </button>
            </form>

            <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
        </main>
    );
};

export default Register;
