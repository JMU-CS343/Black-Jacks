const usernameField = document.getElementById("username");
const fundsField = document.getElementById("funds");
const decksObtainedField = document.getElementById("decksObtained");
const playerIdField = document.getElementById("playerId");
const signOut = document.getElementById("signOut");
const idInput = document.getElementById("idInput");
const warning = document.getElementById("warning");

const id = localStorage.getItem("id");
const TOKEN = "dqhzyddctffje";
const SCORE_ID = "144730";
const DECK_ID = "144731";
const DAY_ID = "146045";
const STREAK_ID = "146046";

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

function getInitalData() {
    if (id == undefined) {
        return "Player Setup";
    }
    return getBoardData().then(data => {
        for (let i = 0; i < data.players.length; i++) {
            const player = data.players[i];
            if (player.id == id) {
                let parsedPlayer = {
                    name: player.name,
                    score: player.scores[SCORE_ID].score,
                    decks: player.scores[DECK_ID].score,
                    streak: player.scores[STREAK_ID].score,
                    day: player.scores[DAY_ID].score
                }
                return parsedPlayer;
            }
        }
        console.error("ID not found in leaderboard service");
        return;
    });
}

function init() {
    if (id != undefined) {
        getInitalData().then(data => {
            money = data.score;
            deckValue = data.decks;
            username = data.name;
            
            usernameField.textContent = username;
            fundsField.textContent = `$${money}`;

            let deckCount = 0;
            let maxDecks = 16;
            const binString = intToBin(deckValue);
            for (let i = 0; i < binString.length; i++) {
                const binDigit = binString.charAt(i);
                if (binDigit === "1") {
                    deckCount++;
                }
            }

            decksObtainedField.textContent = `Decks collected: ${deckCount}/${maxDecks}`
            playerIdField.textContent = `id: ${localStorage.getItem("id")}`;

            warning.style = "display:block;";
            idInput.style = "display:none;";
        });
    } else {
        usernameField.textContent = "Please enter your ID to sign in"
        signOut.textContent = "Sign in";

        warning.style = "display:none;";
        idInput.style = "display:block;";
    }
}
init();

signOut.addEventListener("click", () => {
    if (localStorage.getItem("id") != undefined) {
        localStorage.removeItem("id");
    } else {
        localStorage.setItem("id", idInput.value);
        console.log(idInput.value);
    }
    window.location.href = "index.html";
});