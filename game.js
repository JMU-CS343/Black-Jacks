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