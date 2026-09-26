import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register'; 
import TypingTest from './components/TypingTest'; 
import Dashboard from './components/Dashboard';

// This function checks if the user is logged in
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" />; // Redirects to login if no token
    }
    return children; 
};

function App() {
  // 1. स्टेट (useState) हमेशा फंक्शन के अंदर और return के ऊपर आता है
  const [userName, setUserName] = useState('');

  return (
    <Router>
      <header className="site-header">
        <Link to="/" className="site-brand">
          <span className="site-brand-mark" aria-hidden="true">⌁</span>
          <span>KEYFLOW <span style={{ color: 'var(--muted)', fontWeight: 500 }}>TYPING STUDIO</span></span>
        </Link>
        <Navbar />
        {userName && <span className="welcome-user">Welcome, {userName}</span>}
      </header>
      
      <div className="route-content">
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <TypingTest />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login setUserName={setUserName} />} />
          <Route path="/register" element={<Register setUserName={setUserName} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;