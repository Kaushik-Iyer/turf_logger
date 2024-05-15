import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch('http://localhost:8000/logout', {
            method: 'GET',
            credentials: 'include',
            redirect: 'follow'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Logout failed: ${response.statusText}`);
            }
            return response.json();
        })
        .then(() => {
            navigate('/'); // navigate to the root page
        })
        .catch(error => {
            console.error('Logout failed:', error);
        });
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default LogoutPage;