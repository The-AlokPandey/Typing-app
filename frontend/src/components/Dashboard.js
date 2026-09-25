import React, { useState, useEffect } from 'react';
import '../App.css'; // Dark theme CSS apply karne ke liye

const Dashboard = () => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userId = decodedToken.id || decodedToken._id || decodedToken.userId;

                const response = await fetch(`/api/scores/${userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setScores(data);
            } catch (error) {
                console.error("Error fetching scores", error);
            }
        };
        fetchScores();
    }, []);

    return (
        <div className="typing-container">
            <h2>My Typing History</h2>
            <table style={{ margin: '20px auto', width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#3f3f5a', color: '#ffffff' }}>
                        <th style={{ padding: '15px', border: '1px solid #1e1e2e' }}>Date</th>
                        <th style={{ padding: '15px', border: '1px solid #1e1e2e' }}>Speed (WPM)</th>
                        <th style={{ padding: '15px', border: '1px solid #1e1e2e' }}>Accuracy</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => (
                        <tr key={index} style={{ background: index % 2 === 0 ? '#2a2a35' : '#1e1e2e' }}>
                            <td style={{ padding: '12px', border: '1px solid #3f3f5a' }}>{new Date(score.createdAt).toLocaleDateString()}</td>
                            <td style={{ padding: '12px', border: '1px solid #3f3f5a', color: '#00ffcc', fontWeight: 'bold' }}>{score.wpm}</td>
                            <td style={{ padding: '12px', border: '1px solid #3f3f5a', color: '#ffb86c' }}>{score.accuracy}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;