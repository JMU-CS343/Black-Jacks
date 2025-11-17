// Retrieve buttons
let bjHit = document.getElementById("hit-button");
let bjSplit = document.getElementById("split-button");
let bjStand = document.getElementById("stand-button");
let bjDouble = document.getElementById("double-button");
let bjDeal = document.getElementById("deal-button");

bjHit.disabled = true;
bjSplit.disabled = true;
bjStand.disabled = true;
bjDouble.disabled = true;

// Retrieve cards (split cards retrieved as needed)
let pc1 = document.getElementById("playerC1");
let pc2 = document.getElementById("playerC2");
let pc3 = document.getElementById("playerC3");
let pc4 = document.getElementById("playerC4");
let pc5 = document.getElementById("playerC5");
let pTotal = document.getElementById("player-total");

let dc1 = document.getElementById("dealerC1");
let dc2 = document.getElementById("dealerC2");
let dc3 = document.getElementById("dealerC3");
let dc4 = document.getElementById("dealerC4");
let dc5 = document.getElementById("dealerC5");
let dTotal = document.getElementById("dealer-total");

// Helpful game globals
let sumPlayer = 0;
let sumDealer = 0;
// Tracks which cards were dealt to make game reset easier
let usedCards = [];
let dc2Cover;
let playerSplit = false;
let playerCanHit = true;

// Return a promise that forces the calling function to wait
// for ms time before proceeding
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Given a player card, retrieves a new card from the shuffled deck,
// and deals the card calling animate then populating the field accordingly
// Returns the value of the dealt card (ace returns 11 by default)
// Remove cover needs to be passed to animate card, check its comment for more info
async function dealHelper(playerCard, removeCover) {
  let cardInfo = await drawCard();
  let number = cardInfo[0];
  let suit = cardInfo[1];
  animateCard(playerCard, removeCover);
  
  // Wait to allow animation to play before updating;
  await wait(900);
  playerCard.style.visibility = 'visible';
  let cardValue;
  switch (number) {
    case "ACE":
      ace(playerCard, suit);
      cardValue = 11;
      break;
    case "2":
      two(playerCard, suit);
      cardValue = 2;
      break;
    case "3":
      three(playerCard, suit);
      cardValue = 3;
      break;
    case "4":
      four(playerCard, suit);
      cardValue = 4;
      break;
    case "5":
      five(playerCard, suit);
      cardValue = 5;
      break;
    case "6":
      six(playerCard, suit);
      cardValue = 6;
      break;
    case "7":
      seven(playerCard, suit);
      cardValue = 7;
      break;
    case "8":
      eight(playerCard, suit);
      cardValue = 8;
      break;
    case "9":
      nine(playerCard, suit);
      cardValue = 9;
      break;
    case "10":
      ten(playerCard, suit);
      cardValue = 10;
      break;
    case "JACK":
      faceHelper(playerCard, number, suit);
      cardValue = 10;
      break;
    case "QUEEN":
      faceHelper(playerCard, number, suit);
      cardValue = 10;
      break;
    case "KING":
      faceHelper(playerCard, number, suit);
      cardValue = 10;
      break;
  }
  return cardValue;
}

// Increment counter's total by value
function updateTotal(counter, value){
  let strs = counter.textContent.split(": ");
  strs[1] = parseInt(strs[1]) + value;
  counter.textContent = strs.join(": ");
}

// Preliminary blackjack actions: deal to player and dealer,
// check for blackjack, update total values,
// prompt player for follow-up action (hit, stand, double, split if possible)

// Eventually add arg for betAmnt
async function startGame(){
  bjDeal.disabled = true;
  
  await shuffleDeck();
  // Super annoying but need to use await since deal helper is async and returns promise
  //let pVal1 = await dealHelper(pc1, true);
  let pVal1 = 11;
  ace(pc1, "HEARTS");
  sumPlayer += pVal1;
  updateTotal(pTotal, pVal1);
  usedCards.push(pc1);

  let dVal1 = await dealHelper(dc1, true);
  sumDealer += dVal1;
  updateTotal(dTotal, dVal1);
  usedCards.push(dc1);

  let pVal2 = await dealHelper(pc2, true);
  sumPlayer += pVal2;
  updateTotal(pTotal, pVal2);
  usedCards.push(pc2);

  let dVal2 = await dealHelper(dc2, false);
  sumDealer += dVal2;
  dc2Cover = document.getElementsByClassName("copy")[0];
  // use dc2Cover.remove to "flip" once player is out of moves
  usedCards.push(dc2);

  // TODO: handle blackjack logic
  if (pVal1 + pVal2 == 21){
    endGame();
    return;
  }
  
  // Rare occasion 2 aces drawn
  if (pVal1 + pVal2 == 22) {
    pVal2 = 1;
    pc2.classList.add("ace-is-1");
    sumPlayer -= 10;
    updateTotal(pTotal, -10);
  }

    bjHit.disabled = false;
    bjStand.disabled = false;
    bjDouble.disabled = false;
  
  if (pVal1 == pVal2){
    bjSplit.disabled = false;;
  }
}

// General shutdown events, regardless of how the game ends
function endGame(){
  console.log(usedCards);
  bjDeal.disabled = false;
  bjHit.disabled = true;
  bjSplit.disabled = true;
  bjStand.disabled = true;
  bjDouble.disabled = true;
  usedCards.forEach(used => {
    if (used.classList.contains("player")){
      used.className = "card player";
    }
    else {
      used.className = "card dealer";
    }
      used.innerHTML = "";
      used.style.visibility = "hidden";
    });
  dc2Cover.remove();
  sumPlayer = 0;
  sumDealer = 0;
  bjDeal.disabled = false;
  pTotal.textContent = "Player Total: 0";
  dTotal.textContent = "Dealer Total: 0";
  usedCards = [];
}

async function hit(){
  // TODO: Special logic for split cards
  if (playerSplit){

  }
  else {
    let toHit;
    if (window.getComputedStyle(pc3).visibility === "hidden"){
        toHit = pc3;
    }
    else if (window.getComputedStyle(pc4).visibility === "hidden"){
        toHit = pc4;
    }
    else if (window.getComputedStyle(pc5).visibility === "hidden"){
        toHit = pc5;
        playerCanHit = false;
    }
    else{
      console.error("Player and dealer stand on 5");
    }
    
    let hitVal = await dealHelper(toHit, true);
    sumPlayer += hitVal;
    usedCards.push(toHit);

    if (sumPlayer > 21){
      for (let val of usedCards){
        if (val.classList.contains("ace") &&
            val.classList.contains("player") &&
            !val.classList.contains("ace-is-1")){
              sumPlayer -= 10;
              hitVal -= 10;
              toHit.classList.add("ace-is-1");
          break;
        }
      }
    }
    
    updateTotal(pTotal, hitVal);

    // TODO: handle loss logic
    if (sumPlayer > 21){
        await wait (900);
        endGame();
      }
    // TODO: Call dealer action function
    if (!playerCanHit){
      bjHit.disabled = true;
    }
  }
}

function stand(){
  //TODO: Call dealer action function
}

bjDeal.addEventListener("click", startGame);
bjHit.addEventListener("click", hit);
bjStand.addEventListener("click", stand);