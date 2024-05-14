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
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
}

export default LoginPage;