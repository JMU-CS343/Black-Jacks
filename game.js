let money;
let deckValue; 

function init() {
    getInitalData().then(data => {
        money = data.score;
        deckValue = data.decks;
        shopInit();
    });
    shuffleDeck();
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

let target = document.getElementById("playerC1");
let deal = document.getElementById("deal-button");
deal.addEventListener("click", () => {
  let cardInfo = drawCard();
  let number = cardInfo[0];
  let suit = cardInfo[1];

  switch (number) {
    case "ACE":
      target.classList.add("ace");
      break;
    case "2":
      target.classList.add("two");
      break;
  }
});