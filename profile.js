const usernameField = document.getElementById("username");
const fundsField = document.getElementById("funds");
const decksObtainedField = document.getElementById("decksObtained");
const playerIdField = document.getElementById("playerId");
const signOut = document.getElementById("signOut");
const idInput = document.getElementById("idInput");
const warning = document.getElementById("warning");
const invalidIdWarning = document.getElementById("invalidIdWarning");
const alternative = document.getElementById("alternative");
const createAccount = document.getElementById("createAccount");
const customDecks = document.getElementById("customDecks");

const deck1 = document.getElementById("favDeck-1");
const deck2 = document.getElementById("favDeck-2");
const deck3 = document.getElementById("favDeck-3");

const lastUsed = document.getElementById("lastUsedDecks");

let id = localStorage.getItem("id");
const TOKEN = "dqhzyddctffje";
const SCORE_ID = "144730";
const DECK_ID = "144731";
const DAY_ID = "146045";
const STREAK_ID = "146046";

function setDeckScore(scoreToSet) {
    if (id == undefined) {
        console.error("Player not yet initialized");
        return;
    }
    return fetch(`https://leaderboarded.com/api/${TOKEN}/multiscore/`, {
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

            warning.style = "display:block;color:red;";
            idInput.style = "display:none;";
            createAccount.style = "display:none;"
            alternative.style="display:none;"
            customDecks.style="display:block";
            customDecks.textContent = `Custom decks purchased: ${JSON.parse(localStorage.getItem("custom decks")).length}`;
            deck1.style="display:block;";
            deck2.style="display:block;";
            deck3.style="display:block;";
            lastUsed.style="display:block;";
            let deck1Id = localStorage.getItem("deck-1");
            let deck2Id = localStorage.getItem("deck-2");
            let deck3Id = localStorage.getItem("deck-3");

            function findName(id) {
                if (id >= decks.length - 1) {
                    let custom = JSON.parse(localStorage.getItem("custom decks"));
                    return custom[id - decks.length + 1].name;
                } else {
                    return decks[id].title;
                }
            }

            deck1.textContent=`1. ${findName(deck1Id)}`;
            deck2.textContent=`2. ${findName(deck2Id)}`;
            deck3.textContent=`3. ${findName(deck3Id)}`;
        });
    } else {
        usernameField.textContent = "Please enter your ID to sign in"
        signOut.textContent = "Sign in";

        warning.style = "display:none;";
        idInput.style = "display:block;";
        createAccount.style = "display:block;margin:auto;"
        alternative.style="display:block;"
        customDecks.style="display:none;"
        deck1.style="display:none;";
        deck2.style="display:none;";
        deck3.style="display:none;";
        lastUsed.style="display:none;";
    }
}
init();

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
        id = localStorage.getItem("id");
        setDeckScore(1).then(response => {
            window.location.href = "profile.html";
        });
    })
    .catch(error => console.error('Error:', error));
}

function verifyId(id) {
  return getBoardData().then(data => {
    for (let i = 0; i < data.players.length; i++) {
        const player = data.players[i];
        if (player.id == id) {
            return true;
        }
    }
    return false;
  });
}

signOut.addEventListener("click", () => {
    if (localStorage.getItem("id") != undefined) {
        localStorage.removeItem("id");
        window.location.href = "profile.html";
    } else {
        let id = idInput.value;
        verifyId(id).then(value => {
            if (value) {
                localStorage.setItem("id", id);
                window.location.href = "profile.html";
            } else {
                invalidIdWarning.style = "display:block;color:red;"
                invalidIdWarning.textContent = `\"${id}\" is not a valid ID`;
            }
        });
    }
});

createAccount.addEventListener("click", () => {
    const blur = document.createElement("div");
    blur.setAttribute("class", "blur");

    const popup = document.createElement("div");
    popup.setAttribute("class", "popup");

    const header = document.createElement("h3");
    header.setAttribute("class", "popupTitle");
    header.textContent = "Enter a username";

    const inputField = document.createElement("input");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("placeholder", "username");

    const buttons = document.createElement("div");
    buttons.style="display:flex;justify-content:space-evenly;margin-top:25px;width:30%;";

    const submit = document.createElement("button");
    submit.textContent = "Submit";
    submit.addEventListener("click", () => {

        let name = inputField.value;
        addPlayer(name);

        document.body.removeChild(blur);
        document.body.removeChild(popup);
    });

    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancel.addEventListener("click", () => {
        document.body.removeChild(blur);
        document.body.removeChild(popup);
    });

    buttons.appendChild(submit);
    buttons.appendChild(cancel);

    popup.appendChild(header);
    popup.appendChild(inputField);
    popup.appendChild(buttons);
    document.body.appendChild(blur);
    document.body.appendChild(popup);
});