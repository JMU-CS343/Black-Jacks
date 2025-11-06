let money;
let deckValue; 

function init() {
    getInitalData().then(data => {
        money = data.score;
        deckValue = data.decks;
        shopInit();
    });
}
init();

function handleBuy(index, cost) {
    cost = cost.substring(1);
    if (money >= cost) {
        money -= cost;
        const value = 2 ** index;
        setPlayerScore(money);
        deckValue += value;
        setDeckScore(deckValue);
        shopInit();
        return true;
    }
    return false;
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Replace player card with actual game card and this
// could be a helper function, just call with card that needs to change
let playerCard = document.getElementById("playerC1");
let gameDeal = document.getElementById("deal-button");

// Prevents spanning deal from continuously adding images
let isDealt = false;

// Need async since calling asynchronous functions right now
// Call deck functions as if they were synchronous using await
gameDeal.addEventListener("click", async () => {
  // Replace this with actual logic
  if (isDealt) {
    return;
  }
  isDealt = true;

  await shuffleDeck();
  let cardInfo = await drawCard();
  let number = cardInfo[0];
  let suit = cardInfo[1];

  // Wait 2 sec to allow animation to play before updating;
  await wait(900);

  switch (number) {
    case "ACE":
      playerCard.classList.add("ace");
      ace(playerCard, suit);
      break;
    case "2":
      playerCard.classList.add("two");
      two(playerCard, suit);
      break;
    case "3":
      playerCard.classList.add("three");
      three(playerCard, suit);
      break;
    case "4":
      playerCard.classList.add("four");
      four(playerCard, suit);
      break;
    case "5":
      playerCard.classList.add("five");
      five(playerCard, suit);
      break;
    case "6":
      playerCard.classList.add("six");
      six(playerCard, suit);
      break;
    case "7":
      playerCard.classList.add("seven");
      seven(playerCard, suit);
      break;
    case "8":
      playerCard.classList.add("eight");
      eight(playerCard, suit);
      break;
    case "9":
      playerCard.classList.add("nine");
      nine(playerCard, suit);
      break;
    case "10":
      playerCard.classList.add("ten");
      ten(playerCard, suit);
      break;
    case "JACK":
      playerCard.classList.add("jack");
      faceHelper(playerCard, number, suit)
      break;
    case "QUEEN":
      playerCard.classList.add("queen");
      faceHelper(playerCard, number, suit)
      break;
    case "KING":
      playerCard.classList.add("king");
      faceHelper(playerCard, number, suit);
      break;
  }
});