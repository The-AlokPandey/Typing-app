import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
      {/* 1. नाम को सबसे ऊपर दाईं ओर (Top-Right) सेट कर दिया */}
      <div style={{ position: 'absolute', top: '15px', right: '20px' }}>
         {userName && <b style={{ color: '#28a745', fontSize: '16px' }}>Welcome, {userName}! 👤</b>}
      </div>

      {/* 2. मेन हेडिंग को बीच में रखा है */}
      <h1 style={{ textAlign: 'center', marginTop: '40px', color: '#1a6e9f' }}>Typing Speed App</h1>
      
      {/* 3. Navbar को एकदम सेंटर (बीच) में लाने के लिए flex और center का इस्तेमाल */}
      
         <Navbar />
      
      <Routes>
        {/* Wrap TypingTest and Dashboard inside ProtectedRoute */}
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
        
        {/* Public Routes */}
        <Route path="/login" element={<Login setUserName={setUserName} />} />
        <Route path="/register" element={<Register setUserName={setUserName} />} />
      </Routes>
    </Router>
  );
} // 4. App फंक्शन का क्लोजिंग ब्रैकेट

export default App;