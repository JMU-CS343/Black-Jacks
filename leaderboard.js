const TOKEN = "lpwnhkdchqvxe";
const DECK_COLUMN_ID = "144411";
const id = localStorage.getItem("id");

function getBoardData() {
    fetch(`https://leaderboarded.com/api/${TOKEN}/board/`)
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('API response:', data);
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

function setPlayerScore(id, scoreToSet) {
    if (id == undefined) {
        console.error("Player not yet initialized");
        return;
    }
    fetch(`https://leaderboarded.com/api/${TOKEN}/score/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            player_id: `${id}`,
            score: scoreToSet,
            operation: "set"
        }),
    })
    .catch(error => console.error('Error:', error));
}

function createColumn() {
    fetch(`https://leaderboarded.com/api/${TOKEN}/column/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: "decks",
            sorting: "ASC",
            sort_priority: 0,
            prefix: "",
            suffix: "",
            format: "INTEGER",
            increments: [
                "1"
            ]
        }),
    })
    .then(response => console.log(response.json()))
    .catch(error => console.error('Error:', error))
}

function setDeckScore(id, scoreToSet) {
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
            column_id: DECK_COLUMN_ID,
            player_id: `${id}`,
            score: scoreToSet,
            operation: "set"
        }),
    })
    .catch(error => console.error('Error:', error));
}   