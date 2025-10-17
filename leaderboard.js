const TOKEN = "dqhzyddctffje";
const SCORE_ID = "144730";
const DECK_ID = "144731";
const id = localStorage.getItem("id");

function getBoardData() {
    return fetch(`https://leaderboarded.com/api/${TOKEN}/board/`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

function addPlayer(name) {
    fetch(`https://leaderboarded.com/api/${TOKEN}/player/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: `${name}`,
            is_eliminated: false,
            is_visible: true,
            text_color: "#FFFFFFFF",
            background_color: "FFC800FF",
            team: null,
            score: 0,
            
        }),
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("id", data.player.id);
    })
    .catch(error => console.error('Error:', error));
}

function setPlayerScore(scoreToSet) {
    if (id == undefined) {
        console.error("Player not yet initialized");
        return;
    }
    fetch(`https://leaderboarded.com/api/${TOKEN}/multiscore/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            column_id: SCORE_ID,
            player_id: `${id}`,
            score: scoreToSet,
            operation: "set"
        }),
    })
    .catch(error => console.error('Error:', error));
}

function setDeckScore(scoreToSet) {
    if (id == undefined) {
        console.error("Player not yet initialized");
        return;
    }
    fetch(`https://leaderboarded.com/api/${TOKEN}/multiscore/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            column_id: DECK_ID,
            player_id: `${id}`,
            score: scoreToSet,
            operation: "set"
        }),
    })
    .catch(error => console.error('Error:', error));
}

function handleDeckUpdate() {
    //GET BINARY REPRESENTING DECKS
    //
    //Example: You have decks in the following order:
    //Blue (yes), Red (no), Green (no)
    // Return: 1 0 0
    let bin = 100;
    let num = binToInt(bin);
    setDeckScore(num);
}

function getPlayersInOrder() {
    getBoardData().then(data => {
        let players = [];
        for (let i = 0; i < data.players.length; i++) {
            const player = data.players[i];
            const parsedPlayer = {
                name: player.name,
                score: player.scores[SCORE_ID].score
            };
            players.push(parsedPlayer);
        }
        let sortedPlayers = data.sort((a, b) => a.score - b.score);
        return sortedPlayers;
    });
}

function getInitalData() {
    if (id == undefined) {
        return "Player Setup";
    }
    getBoardData().then(data => {
        for (let i = 0; i < data.players.length; i++) {
            const player = data.players[i];
            if (player.id == id) {
                let parsedPlayer = {
                    name: player.name,
                    score: player.scores[SCORE_ID].score,
                    decks: player.scores[DECK_ID].score
                }
                return parsedPlayer;
            }
        }
        console.error("ID not found in leaderboard service");
        return;
    });
}

function clearId() {
    localStorage.removeItem("id");
}

function setId(id) {
    localStorage.setItem("id", id);
}