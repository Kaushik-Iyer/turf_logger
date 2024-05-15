import React, { useEffect, useState } from 'react';
import CreateEntry from './CreateEntry';

function LogoutPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // new state variable for login status

    useEffect(() => {
        fetch('http://localhost:8000/', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                setIsLoggedIn(true); // set isLoggedIn to true if the response is ok
            } else {
                setIsLoggedIn(false); // set isLoggedIn to false otherwise
            }
        })
    }, []);


    const handleLogout = () => {
        fetch('http://localhost:8000/logout', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Logout failed: ${response.statusText}`);
            }
            return response.json(); // parse the response as JSON
        })
        .then(data => {
            console.log(data);
            if (data.message === 'Logged out') {
                window.location='/'
            } else {
                throw new Error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Logout failed:', error);
        });
    };

    if (!isLoggedIn) {
        return '';
    }
    return (
        <header>
            <button 
                style={{
                    position: 'absolute', 
                    top: '10px', 
                    right: '10px',
                    padding: '10px 20px',
                    fontSize: '1em',
                    borderRadius: '5px',
                    border: 'none',
                    color: '#fff',
                    backgroundColor: '#007BFF',
                    cursor: 'pointer'
                }} 
                onClick={handleLogout}
            >
                Logout
            </button>
            <CreateEntry /> {}
        </header>
         );
}

export default LogoutPage;