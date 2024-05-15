import React, { useState } from 'react';

function CreateEntry() {
    const [player, setPlayer] = useState({ name: '', goals: 0, assists: 0 });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Add this line
    const [response, setResponse] = useState(null);

    const handleChange = (event) => {
        if (event.target.name === 'goals' || event.target.name === 'assists') {
            if (event.target.value < 0) {
                setError(`${event.target.name} cannot be negative`);
                return;
            }
        }
        setError('');
        setPlayer({
            ...player,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (error) {
            return;
        }

        fetch('http://localhost:8000/entries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(player)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Player was created:', data);
                setSuccessMessage('Player was created successfully'); // Add this line
                const date = new Date();
                const day = date.getDate();
                const month = date.getMonth() + 1; // Months are zero-based
                const { goals, assists } = player;

                return fetch(`http://localhost:8000/players/${day}/${month}/${goals}/${assists}`, {
                    credentials: 'include'
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Response from /players/day/month/goals/assists/:', data);
                setResponse(data);
                // Render the response here

            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={player.name} onChange={handleChange} />
                </label>
                <label>
                    Goals:
                    <input type="number" name="goals" value={player.goals} onChange={handleChange} />
                </label>
                <label>
                    Assists:
                    <input type="number" name="assists" value={player.assists} onChange={handleChange} />
                </label>
                {error && <p>{error}</p>}
                <button type="submit">Create Entry</button>
            </form>
            {successMessage && <p>{successMessage}</p>} {/* Add this line */}
            {response && (
                <p>
                    On this day, {response.player} also scored the same goals and assists in the match between {response.home_team} and {response.away_team} ({response.date}).
                </p>
            )}        </div>
    );
}

export default CreateEntry;