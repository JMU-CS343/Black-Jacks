let money;
let deckValue; 
let username; 

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
      console.log(index + ", " + (decks.length - 1));
      if (index == decks.length - 1) {
        money -= cost;
        setPlayerScore(money);

        //SET LOCAL STORAGE TO REFLECT DECK

        shopInit();
        return true;
      } else {
        money -= cost;
        const value = 2 ** index;
        setPlayerScore(money);
        deckValue += value;
        setDeckScore(deckValue);
        shopInit();
        return true;
      }
    }
    return false;
}