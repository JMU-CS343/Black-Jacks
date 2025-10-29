const shop = document.getElementById("shop");
const commons = document.getElementById("commons");
const rares = document.getElementById("rares");
const legendaries = document.getElementById("legendaries");
const decks = [
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

function init() {
    for (let i = 0; i < decks.length; i++) {
        const deck = decks[i];
        const element = document.createElement("div");
        const button = document.createElement("button");
        button.setAttribute("class", `deck-option ${deck.rarity}`);
        button.setAttribute("id", `deck-${deck.title}`);
        button.textContent = deck.title;
        element.appendChild(button);
        document.getElementById(`${deck.rarity}-container`).appendChild(element);
    }
}
init();