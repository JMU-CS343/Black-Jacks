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

const costs = {"common": "$250", "uncommon": "$500", "rare": "$2000", "epic": "$5000", "legendary": "$15000"};

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
        if (i == decks.length - 1 || i >= purchased.length || purchased[i] == false) {
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
    console.log(id);
    for (let deck of decks) {
        const element = document.getElementById(`deck-${deck.title}`);
        if (element != null) {
            element.classList.remove("selectedDeck");
        }
    }
    const customDecks = JSON.parse(localStorage.getItem("custom decks"));
    for (let deck of customDecks) {
        const custom = document.getElementById(`deck-${deck.name}`);
        if (custom != null) {
            custom.classList.remove("selectedDeck");
        }
    }
    document.getElementById(id).classList.add("selectedDeck");
    localStorage.setItem("selectedDeck", i);
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

    const customDecks = JSON.parse(localStorage.getItem("custom decks"));
    let count = decks.length - 1;
    for (let i = 0; i < customDecks.length; i++) {
        let deck = customDecks[i];
        raritiesVisited['legendary'] = true;
        const element = document.createElement("div");
        const button = document.createElement("button");
        button.setAttribute("class", `deck-option legendary`);
        button.setAttribute("id", `deck-${deck.name}`);
        button.textContent = deck.name;

        if ((count + i) == selected) {
            button.classList.add("selectedDeck");
        }
        button.addEventListener("click", ()  => {
            selectDeck(`deck-${deck.name}`, (count + i));
        });
        element.appendChild(button);
        document.getElementById(`legendary-container`).appendChild(element);
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
            if (index == decks.length - 1) {
                imageUpload();
            }
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

    if (index == decks.length - 1) {
        const warning = document.createElement("p");
        warning.textContent = "Custom decks are ONLY saved locally";
        warning.style = "color:red;margin-top:0px;"
        popup.appendChild(warning);
    }

    popup.appendChild(deck);
    popup.appendChild(cost);
    popup.appendChild(buttons);
    popup.appendChild(errorMessage);

    document.body.appendChild(blur);
    document.body.appendChild(popup);
}

// Next two lines strictly for testing,
// This should be called when the legendary deck
// is purchased and that deck should be able to be purchased repeatedly

// Need to fix up the css
// Need to add a cancel button
function imageUpload(){
  const blur = document.createElement("div");
  blur.setAttribute("class", "blur");

  const popup = document.createElement("div");
  popup.setAttribute("class", "popup");

  const imageLabel = document.createElement("label");
  imageLabel.htmlFor = "image-input";
  imageLabel.textContent = "Upload a deck image";
  imageLabel.className = "upload-label"

  const imageInput = document.createElement("input");
  imageInput.type = "file";
  imageInput.id = "image-input";
  imageInput.accept = "image/*";

  const imageContainer = document.createElement("div");
  imageContainer.className = "upload-container"
  const uploaded = document.createElement("img");
  uploaded.className = "upload-preview";
  uploaded.src = 'https://placehold.co/50x50/e0e0e0/777?text=Image+Preview';
  imageContainer.appendChild(uploaded);

  const nameContainer = document.createElement("div");
  nameContainer.id = "deck-name-container";
  
  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Name your deck: ";
  nameLabel.htmlFor = "deck-name";
  const deckName = document.createElement("input");
  deckName.id = "deck-name";
  deckName.type = "text";

  nameContainer.appendChild(nameLabel);
  nameContainer.appendChild(deckName);

  const buttonContainer = document.createElement("div");
  
  const confirm = document.createElement("button");
  confirm.textContent = "Confirm";
  confirm.disabled = true;
  
  const cancel = document.createElement ('button');
  cancel.textContent = "Cancel";
  cancel.id = "popup-cancel";

  buttonContainer.appendChild(confirm);
  buttonContainer.appendChild(cancel);

  cancel.addEventListener("click", () => {
    document.body.removeChild(blur);
    document.body.removeChild(popup);
    document.removeEventListener('keydown', stopKeyEvent, { capture: true });
  })

  let imageUploaded = false;
  let deckNamed = false;
  
  imageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        uploaded.src = e.target.result;
      }
      reader.readAsDataURL(file);
      imageUploaded = true;
      if (deckNamed) {
        confirm.disabled = false;
      }
    }
    else {
      uploaded.src = 'https://placehold.co/50x50/e0e0e0/777?text=Image+Preview';
    }
  });

  deckName.addEventListener("change", () => {
    deckNamed = true;
    if (imageUploaded) {
      confirm.disabled = false;
    }
  });

  // Handle logic for saving the deck here
  confirm.addEventListener("click", () => {
    document.body.removeChild(blur);
    document.body.removeChild(popup);
    document.removeEventListener('keydown', stopKeyEvent, { capture: true });

    // When loading in the custom decks copy the code from function populateLocalStorage in lab 10
    let customDeck = {name: deckName.value, src: uploaded.src};
    localStorage.setItem('custom decks', JSON.stringify([...JSON.parse(localStorage.getItem('custom decks') ?? '[]'), customDeck]));

    let cardDeck = document.getElementsByClassName("dealer-deck")[0];
    let deckImg = document.createElement("img");
    deckImg.src = uploaded.src;
    deckImg.classList.add("custom-deck");
    cardDeck.appendChild(deckImg);
  });
  
  popup.appendChild(imageLabel);
  popup.appendChild(imageInput);
  popup.appendChild(imageContainer);
  popup.appendChild(nameContainer);
  popup.appendChild(buttonContainer);
  
  document.body.appendChild(blur);
  document.body.appendChild(popup);
  document.addEventListener('keydown', stopKeyEvent, { capture: true });
}

function stopKeyEvent(e){
  e.stopPropagation();
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