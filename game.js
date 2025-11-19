let money;
let deckValue; 
let username; 

const moneyDisplay = document.getElementById("total-earnings");

function init() {
    getInitalData().then(data => {
        money = data.score;
        deckValue = data.decks;
        username = data.name;
        shopInit();
    });
}
init();

function handleBuy(index, cost) {
    cost = cost.substring(1);
    if (money >= cost) {
      if (index == decks.length - 1) {
        money -= cost;
        setPlayerScore(money);
        moneyDisplay.textContent = `$${money}`;
        shopInit();
        return true;
      } else {
        money -= cost;
        const value = 2 ** index;
        setPlayerScore(money);
        moneyDisplay.textContent = `$${money}`;
        deckValue += value;
        setDeckScore(deckValue);
        shopInit();
        return true;
      }
    }
    return false;
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Need to wait until game logic is implimented to decide best way to use this
// Right now this just creates and shuffles the deck sets up the card visual
// to match whatever card was dealt
let playerCard = document.getElementById("playerC1");
let gameDeal = document.getElementById("deal-button");

// Prevents spanning deal from continuously adding images
let isDealt = false;

gameDeal.addEventListener("click", async () => {
  if (isDealt) {
    return;
  }
  isDealt = true;

  await shuffleDeck();
  let cardInfo = await drawCard();
  let number = cardInfo[0];
  let suit = cardInfo[1];

  // Wait to allow animation to play before updating;
  await wait(900);

  switch (number) {
    case "ACE":
      ace(playerCard, suit);
      break;
    case "2":
      two(playerCard, suit);
      break;
    case "3":
      three(playerCard, suit);
      break;
    case "4":
      four(playerCard, suit);
      break;
    case "5":
      five(playerCard, suit);
      break;
    case "6":
      six(playerCard, suit);
      break;
    case "7":
      seven(playerCard, suit);
      break;
    case "8":
      eight(playerCard, suit);
      break;
    case "9":
      nine(playerCard, suit);
      break;
    case "10":
      ten(playerCard, suit);
      break;
    case "JACK":
      faceHelper(playerCard, number, suit)
      break;
    case "QUEEN":
      faceHelper(playerCard, number, suit)
      break;
    case "KING":
      faceHelper(playerCard, number, suit);
      break;
  }
});