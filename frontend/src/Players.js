import React, { useEffect, useState } from 'react';
import LiveScores from './LiveScores';

function PlayersPage() {
    const [players, setPlayers] = useState(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/players',{
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => setPlayers(data));
        fetch('http://localhost:8000/visualize',{
            credentials: 'include'
        })
            .then(response => response.text())
            .then(data => setChartData(data)
        )
    }, []);

    if (players === null) {
        return 'Loading...';
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f8f8', paddingTop: '10%'}}>
            <div style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
                <LiveScores />
                <div>
                    <div dangerouslySetInnerHTML={{__html: chartData}}></div>
                    <h1 style={{marginBottom: '20px'}}>Your previous entries</h1>
                    <table style={{width: '80%', borderCollapse: 'collapse', textAlign: 'center', margin: 'auto', backgroundColor: '#fff', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'}}>
                        <thead>
                            <tr style={{backgroundColor: '#007BFF', color: '#fff'}}>
                                <th style={{padding: '10px'}}>Name</th>
                                <th style={{padding: '10px'}}>Goals</th>
                                <th style={{padding: '10px'}}>Assists</th>
                                <th style={{padding: '10px'}}>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player, index) => {
                                const date = new Date(player.created_at);
                                const formattedDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
                                return (
                                    <tr key={player._id} style={{backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#fff'}}>
                                        <td style={{padding: '10px'}}>{player.name}</td>
                                        <td style={{padding: '10px'}}>{player.goals}</td>
                                        <td style={{padding: '10px'}}>{player.assists}</td>
                                        <td style={{padding: '10px'}}>{formattedDate}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PlayersPage;