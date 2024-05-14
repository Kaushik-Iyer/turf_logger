import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import LoginPage from './Login';
import PlayersPage from './Players'; // Import your PlayersPage component

function App() {
    const [redirectTo, setRedirectTo] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/', {
            credentials: 'include'
        }
        )
            .then(response => response.json())
            .then(data => {
                if (data.loggedIn) {
                    setRedirectTo('/players');
                } else {
                    setRedirectTo('/login');
                }
            });
    }, []);

    if (redirectTo === '') {
        return 'Loading...';
    }

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/players" element={<PlayersPage />} />
            </Routes>
            <Navigate to={redirectTo} />
        </Router>
    );
}

export default App;