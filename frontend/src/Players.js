import React, { useEffect, useState } from 'react';

function PlayersPage() {
    const [players, setPlayers] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/players',{
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => setPlayers(data));
    }, []);

    if (players === null) {
        return 'Loading...';
    }

    return (
        <div>
            <h1>Players</h1>
            <pre>{JSON.stringify(players, null, 2)}</pre>
        </div>
    );
}

export default PlayersPage;