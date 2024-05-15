import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import LoginPage from './Login';
import PlayersPage from './Players'; // Import your PlayersPage component
import LogoutPage from './Logout'; // Import your LogoutPage component
import Header from './Header';

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
            <Header />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/players" element={<PlayersPage />} />
                <Route path="/logout" element={<LogoutPage />} />
            </Routes>
            <Navigate to={redirectTo} />
        </Router>
    );
}

export default App;