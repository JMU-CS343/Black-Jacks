const TOKEN = "dqhzyddctffje";
const SCORE_ID = "144730";
const DECK_ID = "144731";
const DAY_ID = "146045";
const STREAK_ID = "146046";
let id = localStorage.getItem("id");

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
        id = localStorage.getItem("id");
        setDeckScore(1);
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
    console.log("SETTING DECK");
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

// THIS IS THE LEADERBOARD DISPLAYER
function displayer() {
  getBoardData().then(data => {
    const total = document.getElementById("total-earnings");
    const leader = document.getElementById("top-10-list");
    const myrank = document.getElementById("my-rank");
    const playerId = localStorage.getItem("id");

    leader.innerHTML = "";

    const sortedPlayers = [...data.players].sort(
      (a, b) => b.scores[SCORE_ID].score - a.scores[SCORE_ID].score
    );

    sortedPlayers.slice(0, 10).forEach((player, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${player.name} — $${player.scores[SCORE_ID].score}`;
      leader.appendChild(li);
    });

    const rank = sortedPlayers.findIndex(p => p.id == playerId) + 1;
    const me = sortedPlayers.find(p => p.id == playerId);

    if (me) {
      total.textContent = `$${me.scores[SCORE_ID].score}`;
      myrank.textContent = `You are currently ranked #${rank} with $${me.scores[SCORE_ID].score}`;
    } else {
      total.textContent = "$0";
      myrank.textContent = "";
    }
  })
}

function information() {
  getBoardData().then(data => {
    const playersList = document.getElementById("players-list");
    const paginationContainer = document.getElementById("pagination-container");

    const sortedPlayers = data.players.slice().sort(function(a, b) {
      let aScore = 0;
      let bScore = 0;
      if (a.scores && a.scores[SCORE_ID] && a.scores[SCORE_ID].score) {
        aScore = a.scores[SCORE_ID].score;
      }
      if (b.scores && b.scores[SCORE_ID] && b.scores[SCORE_ID].score) {
        bScore = b.scores[SCORE_ID].score;
      }
      return bScore - aScore;
    });

    const playersPerPage = 9;
    let currentPage = 1;
    const totalPages = Math.ceil(sortedPlayers.length / playersPerPage);

    function renderPage(page) {
      playersList.innerHTML = "";

      const start = (page - 1) * playersPerPage;
      const end = start + playersPerPage;
      const playersToShow = sortedPlayers.slice(start, end);

      for (let i = 0; i < playersToShow.length; i++) {
        const player = playersToShow[i];
        const name = player.name;
        let money = 0;
        let streak = 0;
        if (player.scores && player.scores[SCORE_ID] && player.scores[SCORE_ID].score) {
          money = player.scores[SCORE_ID].score;
        }
        if (player.scores && player.scores[STREAK_ID] && player.scores[STREAK_ID].score) {
          streak = player.scores[STREAK_ID].score;
        }
        const rank = start + i + 1;

        const p = document.createElement("p");
        if (playersList.classList.contains("grid-view")) {
          p.innerHTML = `
            <strong>Rank:</strong> #${rank}<br>
            <strong>Name:</strong> ${name}<br>
            <strong>Amount:</strong> $${money}<br>
            <strong>Streak:</strong> ${streak}
          `;
        } else {
          p.textContent = `Rank: #${rank} | Name: ${name} | Amount: $${money} | Streak: ${streak}`;
        }
        playersList.appendChild(p);
      }
      renderPaginationControls();
    }

    function renderPaginationControls() {
      paginationContainer.innerHTML = "";

      const prevButton = document.createElement("button");
      prevButton.textContent = "Previous Page";
      prevButton.disabled = currentPage === 1;
      prevButton.onclick = () => {
        if (currentPage > 1) {
          currentPage--;
          renderPage(currentPage);
        }
      };

      const nextButton = document.createElement("button");
      nextButton.textContent = "Next Page";
      nextButton.disabled = currentPage === totalPages;
      nextButton.onclick = () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderPage(currentPage);
        }
      };

      const pageIndicator = document.createElement("span");
      pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
      pageIndicator.style.margin = "0 10px";

      paginationContainer.appendChild(prevButton);
      paginationContainer.appendChild(pageIndicator);
      paginationContainer.appendChild(nextButton);
    }

    renderPage(currentPage);

    const listBtn = document.getElementById("list-view-btn");
    const gridBtn = document.getElementById("grid-view-btn");

    playersList.classList.add("list-view");

    listBtn.addEventListener("click", () => {
      playersList.classList.remove("grid-view");
      playersList.classList.add("list-view");
      renderPage(currentPage);
    });

    gridBtn.addEventListener("click", () => {
      playersList.classList.remove("list-view");
      playersList.classList.add("grid-view");
      renderPage(currentPage);
    });
  });
}

function clearId() {
    localStorage.removeItem("id");
}

function setId(id) {
    localStorage.setItem("id", id);
}

function getStreak() {
    if (id == undefined) {
        return "Player Setup";
    }
    return getBoardData().then(data => {
        for (let i = 0; i < data.players.length; i++) {
            const player = data.players[i];
            if (player.id == id) {
                return player.scores[STREAK_ID].score;
            }
        }
        console.error("ID not found in leaderboard service");
        return;
    });
}

function setStreak(valToSet) {
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
            column_id: STREAK_ID,
            player_id: `${id}`,
            score: valToSet,
            operation: "set"
        }),
    })
    .catch(error => console.error('Error:', error));
}

function getDay() {
    if (id == undefined) {
        return "Player Setup";
    }
    return getBoardData().then(data => {
        for (let i = 0; i < data.players.length; i++) {
            const player = data.players[i];
            if (player.id == id) {
                return player.scores[STREAK_ID].score;
            }
        }
        console.error("ID not found in leaderboard service");
        return;
    });
}

function setDay(valToSet) {
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
            column_id: DAY_ID,
            player_id: `${id}`,
            score: valToSet,
            operation: "set"
        }),
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener("DOMContentLoaded", () => {
  displayer();
  information();
});