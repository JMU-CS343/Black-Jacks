const shop = document.getElementById("shop");
const commons = document.getElementById("commons");
const rares = document.getElementById("rares");
const legendaries = document.getElementById("legendaries");
const decks = [
    {
        "title": "default",
        "rarity": "common"
    },
    {
        "title": "blue",
        "rarity": "common"
    },
    {
        "title": "red",
        "rarity": "common"
    },
    {
        "title": "green",
        "rarity": "common"
    },
    {
        "title": "yellow",
        "rarity": "common"
    },
    {
        "title": "white",
        "rarity": "common"
    },
    {
        "title": "purple",
        "rarity": "uncommon"
    },
    {
        "title": "maroon",
        "rarity": "uncommon"
    },
    {
        "title": "hot pink",
        "rarity": "uncommon"
    },
    {
        "title": "eggshell",
        "rarity": "uncommon"
    },
    {
        "title": "chromatic",
        "rarity": "rare"
    },
    {
        "title": "metallic",
        "rarity": "rare"
    },
    {
        "title": "glass",
        "rarity": "rare"
    },
    {
        "title": "jmu",
        "rarity": "epic"
    },
    {
        "title": "golden",
        "rarity": "epic"
    },
    {
        "title": "custom",
        "rarity": "legendary"
    },
]

const costs = {"common": "$25", "uncommon": "$50", "rare": "$100", "epic": "$250", "legendary": "$500"};

let selected = localStorage.getItem("selectedDeck");
if (selected == null) {
    localStorage.setItem("selectedDeck", "1");
    selected = "1";
}

let purchased = [];

function shopInit() {

    document.getElementById("common-container").innerHTML = `<legend>${costs.common}</legend>`;
    document.getElementById("uncommon-container").innerHTML = `<legend>${costs.uncommon}</legend>`;
    document.getElementById("rare-container").innerHTML = `<legend>${costs.rare}</legend>`;
    document.getElementById("epic-container").innerHTML = `<legend>${costs.epic}</legend>`;
    document.getElementById("legendary-container").innerHTML = `<legend>${costs.legendary}</legend>`;

    purchased = [];

    const binString = intToBin(deckValue);
    if (binString !== "0") {
        for (let i = 0; i < binString.length; i++) {
            let digit = binString.charAt(binString.length - 1 - i);
            if (digit == "1") {
                purchased[i] = true;
            } else {
                purchased[i] = false;
            }
        }
    }

    let raritiesVisited = {"common": false, "uncommon": false, "rare": false, "epic": false, "legendary": false};
    for (let i = 0; i < decks.length; i++) {
        if (i >= purchased.length || purchased[i] == false) {
            const deck = decks[i];
            raritiesVisited[`${deck.rarity}`] = true;
            const element = document.createElement("div");
            const button = document.createElement("button");
            button.setAttribute("class", `deck-option ${deck.rarity}`);
            button.setAttribute("id", `deck-${deck.title}`);
            button.textContent = deck.title;
            button.addEventListener("click", ()  => {
                handleShopClick(`deck-${deck.title}`, deck.title, deck.rarity, i)
            });
            element.appendChild(button);
            document.getElementById(`${deck.rarity}-container`).appendChild(element);
        }
    }

    for (let rarityVisited in raritiesVisited) {
        document.getElementById(`${rarityVisited}-container`).style = "display:flex;"
        if (raritiesVisited[`${rarityVisited}`] == false) {
            const soldOut = document.createElement("p");
            soldOut.textContent = "Sold out";
            document.getElementById(`${rarityVisited}-container`).appendChild(soldOut);
        }
    }
}

function selectDeck(id, i) {
    for (let deck of decks) {
        const element = document.getElementById(`deck-${deck.title}`);
        if (element != null) {
            element.classList.remove("selectedDeck");
        }
        if(`deck-${deck.title}` == id) {
            document.getElementById(`deck-${deck.title}`).classList.add("selectedDeck");
            localStorage.setItem("selectedDeck", i);
        }
    }
}

function deckInit() {

    document.getElementById("common-container").innerHTML = `<legend>Common</legend>`;
    document.getElementById("uncommon-container").innerHTML = `<legend>Uncommon</legend>`;
    document.getElementById("rare-container").innerHTML = `<legend>Rare</legend>`;
    document.getElementById("epic-container").innerHTML = `<legend>Epic</legend>`;
    document.getElementById("legendary-container").innerHTML = `<legend>Legendary</legend>`;

    purchased = [];

    const binString = intToBin(deckValue);
    if (binString !== "0") {
        for (let i = 0; i < binString.length; i++) {
            let digit = binString.charAt(binString.length - 1 - i);
            if (digit == "1") {
                purchased[i] = true;
            } else {
                purchased[i] = false;
            }
        }
    }

    let raritiesVisited = {"common": false, "uncommon": false, "rare": false, "epic": false, "legendary": false};
    for (let i = 0; i < decks.length; i++) {
        if (i < purchased.length && purchased[i] == true) {
            const deck = decks[i];
            raritiesVisited[`${deck.rarity}`] = true;
            const element = document.createElement("div");
            const button = document.createElement("button");
            button.setAttribute("class", `deck-option ${deck.rarity}`);
            button.setAttribute("id", `deck-${deck.title}`);
            button.textContent = deck.title;
            if (i == selected) {
                button.classList.add("selectedDeck");
            }
            button.addEventListener("click", ()  => {
                selectDeck(`deck-${deck.title}`, i);
            });
            element.appendChild(button);
            document.getElementById(`${deck.rarity}-container`).appendChild(element);
        }
    }

    for (let rarityVisited in raritiesVisited) {
        if (raritiesVisited[`${rarityVisited}`] == false) {
            document.getElementById(`${rarityVisited}-container`).style = "display:none;";
        }
    }
}

function handleShopClick(id, title, rarity, index) {

    const blur = document.createElement("div");
    blur.setAttribute("class", "blur");

    const popup = document.createElement("div");
    popup.setAttribute("class", "popup");
    
    const funds = document.createElement("h3");
    funds.style="color:green;position:absolute;top:5px;margin-left:auto;margin-right:auto;"
    funds.textContent = `$${money}`;

    const header = document.createElement("h3");
    header.setAttribute("class", "popupTitle");
    header.textContent = "Are you sure you want to purchase?";

    const deck = document.createElement("div");
    deck.setAttribute("class", `deck-option ${rarity}`);
    deck.style="display:flex;align-items:center;justify-content:center"
    deck.textContent = title;

    const cost = document.createElement("p");
    cost.style="color:black;"
    const costValue = costs[rarity];
    cost.textContent = costValue;

    const buttons = document.createElement("div");
    buttons.style="display:flex;justify-content:space-evenly;width:20vw;margin-top:30px;"

    const affirm = document.createElement("button");
    const decline = document.createElement("button");
    affirm.setAttribute("class", "popupButton affirm");
    decline.setAttribute("class", "popupButton decline");
    affirm.textContent = "Buy";
    decline.textContent = "Cancel";

    const errorMessage = document.createElement("p");
    errorMessage.setAttribute("class", "errorMessage");

    affirm.addEventListener("click", () => {
        const result = handleBuy(index, costs[rarity]);
        if (result == false) {
            errorMessage.textContent = "Insufficent Funds";
        } else {
            document.body.removeChild(blur);
            document.body.removeChild(popup);
        }
    });

    decline.addEventListener("click", () => {
        document.body.removeChild(blur);
        document.body.removeChild(popup);
    });

    buttons.appendChild(affirm);
    buttons.appendChild(decline);

    popup.appendChild(funds);
    popup.appendChild(header);
    popup.appendChild(deck);
    popup.appendChild(cost);
    popup.appendChild(buttons);
    popup.appendChild(errorMessage);

    document.body.appendChild(blur);
    document.body.appendChild(popup);
}

const shopButton = document.getElementById("shop-button-controller");
const deckButton = document.getElementById("deck-button-controller");

shopButton.addEventListener("click", () => {
    if (shopButton.classList.contains("selected")) {
        return;
    }
    shopButton.classList.add("selected");
    deckButton.classList.remove("selected");
    shopInit();
});

deckButton.addEventListener("click", () => {
    if (deckButton.classList.contains("selected")) {
        return;
    }
    deckButton.classList.add("selected");
    shopButton.classList.remove("selected");
    deckInit();
});