import React, { useEffect } from 'react';

function LoginPage() {
    const handleLogin = () => {
        // Replace with your FastAPI backend's Google OAuth endpoint
        const oauthEndpoint = 'http://localhost:8000/login';

        // Redirect the user to the Google OAuth endpoint
        window.location.href = oauthEndpoint;
    };

    // This effect runs when the component mounts
    useEffect(() => {
        // Check if the user has just been redirected back from the OAuth endpoint
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            // Store the token in local storage
            localStorage.setItem('token', token);

            // Redirect the user to the /players page
            window.location.href = '/players';
        }
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
            <h1 style={{ fontSize: '2rem', color: '#333', marginBottom: '2rem' }}>Turf-Stats-Logger</h1>
            <button style={{ padding: '1rem 2rem', fontSize: '1rem', color: '#fff', backgroundColor: '#4285f4', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={handleLogin}>Login with Google</button>
        </div>
    );
}

export default LoginPage;