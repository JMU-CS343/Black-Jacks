let uname; 

function init() {
    getInitalData().then(data => {
        money = data.score;
        uname = data.name;
    });
}
init();

// Retrieve buttons
let bjHit = document.getElementById("hit-button");
let bjSplit = document.getElementById("split-button");
let bjStand = document.getElementById("stand-button");
let bjDouble = document.getElementById("double-button");
let bjDeal = document.getElementById("deal-button");

// Retrieve chips
let oneChip = document.getElementById("one");
let threeChip = document.getElementById("three");
let fiveChip = document.getElementById("five");
let tenChip = document.getElementById("ten");
let twentyfiveChip = document.getElementById("twentyfive");
let fiftyChip = document.getElementById("fifty");
let onehundredChip = document.getElementById("onehundred");
let fivehundredChip = document.getElementById("fivehundred");

let chips = [oneChip, threeChip, fiveChip, tenChip, twentyfiveChip, fiftyChip, onehundredChip, fivehundredChip];

const chipArea = document.getElementById("chip-area");
const currency = document.getElementById("currency");

bjDeal.disabled = true;
bjHit.disabled = true;
bjSplit.disabled = true;
bjStand.disabled = true;
bjDouble.disabled = true;
// Disable hit button as well once betting buttons implimented

// Retrieve cards
let pc1 = document.getElementById("playerC1");
let pc2 = document.getElementById("playerC2");
let pc3 = document.getElementById("playerC3");
let pc4 = document.getElementById("playerC4");
let pc5 = document.getElementById("playerC5");
let pDisplayedTotal = document.getElementById("player-total");

// Retrieve split cards
let sc1 = document.getElementById("player-splitC1");
let sc2 = document.getElementById("player-splitC2");
let sc3 = document.getElementById("player-splitC3");
let sc4 = document.getElementById("player-splitC4");
let sc5 = document.getElementById("player-splitC5");
let sDisplayedTotal = document.getElementById("player-split-total");

// Other cards initialized in dealer function
let dc1 = document.getElementById("dealerC1");
let dc2 = document.getElementById("dealerC2");
let dDisplayedTotal = document.getElementById("dealer-total");

let pVal2;
let dVal2;
let sTotal = document.getElementById("player-split-total");

// Helpful game globals
let sumPlayer = 0;
let sumDealer = 0;
let sumSplit = 0;
let usedCards = [];
let dc2Cover;
let playerSplit = false;
let splitFirstHit = false;
let playerDouble = false;
let playerCanHit = true;
let playerStands = 0;

// Player-specific globals
let betAmnt = 0;
let betPayout = 0;

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
    case "ACE": ace(playerCard, suit); cardValue = 11; break;
    case "2": two(playerCard, suit); cardValue = 2; break;
    case "3": three(playerCard, suit); cardValue = 3; break;
    case "4": four(playerCard, suit); cardValue = 4; break;
    case "5": five(playerCard, suit); cardValue = 5; break;
    case "6": six(playerCard, suit); cardValue = 6; break;
    case "7": seven(playerCard, suit); cardValue = 7; break;
    case "8": eight(playerCard, suit); cardValue = 8; break;
    case "9": nine(playerCard, suit); cardValue = 9; break;
    case "10": ten(playerCard, suit); cardValue = 10; break;
    case "JACK": faceHelper(playerCard, number, suit); cardValue = 10; break;
    case "QUEEN": faceHelper(playerCard, number, suit); cardValue = 10; break;
    case "KING": faceHelper(playerCard, number, suit); cardValue = 10; break;
  }
  return cardValue;
}

// Increment counter's total by value
// This is not a setter
function updateTotal(counter, value){
  let strs = counter.textContent.split(": ");
  strs[1] = parseInt(strs[1]) + value;
  counter.textContent = strs.join(": ");
}

// Preliminary blackjack actions

function betHelper(value){
  console.log(money);
  value = parseInt(value);
  if (money - value >= 0){
    money -= value;
    betAmnt += value;
    console.log(betAmnt);
    setPlayerScore(money);
    moneyDisplay.textContent = `$${money}`;
    document.getElementById("currency").textContent = `Betting: $${betAmnt}`;
    bjDeal.disabled = false;
  }
  else {
    alert("Insufficent funds");
  }
}

async function startGame(){
  chips.forEach(chip => {chip.disabled = true;});
  bjDeal.disabled = true;
  resetBtn.disabled = true;

  // Super annoying but need to use await since deal helper is async and returns promise
  let pVal1 = await dealHelper(pc1, true);
  sumPlayer += pVal1;
  updateTotal(pDisplayedTotal, pVal1);
  usedCards.push(pc1);

  let dVal1 = await dealHelper(dc1, true);
  sumDealer += dVal1;
  updateTotal(dDisplayedTotal, dVal1);
  usedCards.push(dc1);

  pVal2 = await dealHelper(pc2, true);
  sumPlayer += pVal2;
  updateTotal(pDisplayedTotal, pVal2);
  usedCards.push(pc2);

  dVal2 = await dealHelper(dc2, false);
  sumDealer += dVal2;
  dc2Cover = document.getElementsByClassName("copy")[0];
  usedCards.push(dc2);

  if (pVal1 + pVal2 == 21){
    endGame(`Blackjacks! ${uname} wins! D: ${sumDealer}`, `${uname} wins $${betAmnt * 3}`);
    return;
  }
  
  // Rare occasion 2 aces drawn
  if (pVal1 + pVal2 == 22) {
    pVal2 = 1;
    pc2.classList.add("ace-is-1");
    sumPlayer -= 10;
    updateTotal(pDisplayedTotal, -10);
  }

  bjHit.disabled = false;
  bjStand.disabled = false;

  // Can only double if sufficent funds
  let canDouble = false;
  if (money - betAmnt >= 0){
    bjDouble.disabled = false;
    canDouble = true;
  }
  
  //Move in and out of if during testing
  if (pVal1 == pVal2 && canDouble){
    bjSplit.disabled = false;
  }
}

// General shutdown events, regardless of how the game ends
async function endGame(endMessage, moneyMessage){
  await wait (1000);

  chipArea.classList.add("hidden");
  currency.classList.add("hidden");

  // End game display window
  const blur = document.createElement("div");
  blur.setAttribute("class", "blur");

  const popup = document.createElement("div");
  popup.setAttribute("class", "popup");

  const header = document.createElement("h3");
  header.setAttribute("class", "end-title");
  header.textAlign = "center";
  header.textContent = `Game Over!`;

  const subheader = document.createElement("h4");
  subheader.setAttribute("class", "end-subtitle");
  subheader.textContent = endMessage;

  const payout = document.createElement("p");
  if(moneyMessage.includes("win"))
    payout.setAttribute("class", "end-payout-win");
  else
    payout.setAttribute("class", "end-payout-loss");
  payout.textContent = moneyMessage;

  const again = document.createElement("button");
  again.setAttribute("class", "end-replay");
  again.textContent = "Play again!"

  popup.appendChild(header);
  popup.appendChild(subheader);
  popup.appendChild(payout);
  popup.appendChild(again);

  document.body.append(popup);
  document.body.append(blur);

  again.addEventListener("click", () => {
    document.body.removeChild(blur);
    document.body.removeChild(popup);

    chipArea.classList.remove("hidden");
    currency.classList.remove("hidden");
  });

  // Actual gameplay cleanup
  // Reset overwritten fields
  pc1 = document.getElementById("playerC1");
  pc2 = document.getElementById("playerC2");
  pc3 = document.getElementById("playerC3");
  pc4 = document.getElementById("playerC4");
  pc5 = document.getElementById("playerC5");
  pDisplayedTotal = document.getElementById("player-total");

  bjDeal.disabled = true;
  bjHit.disabled = true;
  bjSplit.disabled = true;
  bjStand.disabled = true;
  bjDouble.disabled = true;
  resetBtn.disabled = true;
  chips.forEach(chip => {chip.disabled = false;});

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

  sTotal.style.visibility = "hidden";
  dc2Cover.remove();

  playerCanHit = true;
  playerDouble = false;
  playerSplit = false;
  splitFirstHit = false;
  playerStands = 0;
  
  sumPlayer = 0;
  sumDealer = 0;
  sumSplit = 0;
  pDisplayedTotal.textContent = "Player Total: 0";
  dDisplayedTotal.textContent = "Dealer Total: 0";
  sDisplayedTotal.textContent = "Player Split Total: 0";
  usedCards = [];

  betAmnt = 0;
  betPayout = 0;
  document.getElementById("currency").textContent = `Betting: $${betAmnt}`;
  
  bjHit.removeEventListener("click", splitHitWrapper);
  bjHit.addEventListener("click", regHit);
}

async function hit(split = false){
  if (!playerCanHit){
    bjHit.disabled = true;
    return;
  }

  // Main hand values or or split hand values
  let currentSum = split ? sumSplit : sumPlayer;
  let currentDisplay = split ? sDisplayedTotal : pDisplayedTotal;
  let aceSearchStr = split ? "split" : "player";
  let cards = split ? [sc1, sc2, sc3, sc4, sc5] : [pc1, pc2, pc3, pc4, pc5];

  let toHit = null;

  // If split need to place in slot 2
  if (splitFirstHit) {
    toHit = cards[1];
    splitFirstHit = false;
  } 
  else {
    // Loop until destination found
    for (let i = 2; i < cards.length; i++) {
        if (window.getComputedStyle(cards[i]).visibility === "hidden") {
            toHit = cards[i];
            break;
        }
    }
  }

  // If hand is full, stop
  if (!toHit) {
      if (!split) playerCanHit = false;
      return;
  }

  // Mark card properly
  if (split) {
    toHit.classList.add("split");
    toHit.classList.remove("player");
  } else {
    toHit.classList.add("player");
  }
  
  let hitVal = await dealHelper(toHit, true);
  
  // Update global variables and keep track of current sum
  if (split) {
      sumSplit += hitVal;
      currentSum = sumSplit;
  } else {
      sumPlayer += hitVal;
      currentSum = sumPlayer;
  }
  
  usedCards.push(toHit);

  // Ace logic
  if (currentSum > 21){
    for (let val of usedCards){
      if (val.classList.contains("ace") &&
          val.classList.contains(aceSearchStr) &&
          !val.classList.contains("ace-is-1")){
            
            if (split) sumSplit -= 10;
            else sumPlayer -= 10;
            
            currentSum -= 10; 
            hitVal -= 10;
            
            val.classList.add("ace-is-1");
        break;
      }
    }
  }

  updateTotal(currentDisplay, hitVal);
  if (currentSum > 21){
    stand();
  }
}

async function double(){
  playerDouble = true;
  bjHit.disabled = true;
  money - betAmnt;
  betAmnt *= 2;
  console.log("Split amount " + betAmnt);
  document.getElementById("currency").textContent = `Betting: $${betAmnt}`;
  // await prevents synch issues
  await hit();
  dealer()
}

function split(){
  bjSplit.disabled = true;
  money - betAmnt;
  document.getElementById("currency").textContent = `Betting: $${betAmnt + betAmnt}`;
  // I don't want to implement split double tbh
  bjDouble.disabled = true;
  playerSplit = true;
  splitFirstHit = true;
  sc1.style.visibility = "visible";
  sc1.innerHTML = pc2.innerHTML;
  sc1.className = pc2.className;
  sc1.classList.add("split");
  sc1.classList.remove("player");
  usedCards.push(sc1);

  // Handle reset of old location
  pc2.style.visibility = "hidden";
  pc2.className = "card player";
  pc2.innerHTML = "";
  sumPlayer -= pVal2;
  updateTotal(pDisplayedTotal, -pVal2);

  sDisplayedTotal.style.visibility = "visible";
  updateTotal(sDisplayedTotal, pVal2);
  sumSplit += pVal2;
  let cards = [pc1, pc2, pc3, pc4, pc5];
  cards.forEach(card => {card.style.borderColor = "yellow";});
}

// Background change logic is terrible but i dont feel like changing
function stand(){
  playerStands += 1;
  splitFirstHit = true;
  if (playerStands == 2 || playerSplit == false){
    let cards = [sc1, sc2, sc3, sc4, sc5];
    cards.forEach(card => {card.style.borderColor = "black";});
    dealer();
  }
  else {
    let cards = [pc1, pc2, pc3, pc4, pc5];
    cards.forEach(card => {card.style.borderColor = "black";});
    cards = [sc1, sc2, sc3, sc4, sc5];
    cards.forEach(card => {card.style.borderColor = "yellow";});

    bjHit.removeEventListener("click", regHit);
    bjHit.addEventListener("click", splitHitWrapper);
  }
}

async function dealer(){
  dc2Cover.remove();
  updateTotal(dDisplayedTotal, dVal2)
  let dealTarget = 3;

  // Draw until dealer reaches or exceeds 17, or has 5 cards
  while (sumDealer < 17 && dealTarget <= 5){
    let curId = `dealerC${dealTarget}`;
    let dc = document.getElementById(curId);

    let dVal = await dealHelper(dc, true);
    sumDealer += dVal;
    // Check dealer aces
    if (sumDealer > 21){
      for (let val of usedCards){
        if (val.classList.contains("ace") &&
        val.classList.contains("dealer") &&
        !val.classList.contains("ace-is-1")){
          sumDealer -= 10;
          val.classList.add("ace-is-1");
          break;
        }
      }
    }

    updateTotal(dDisplayedTotal, dVal);
    usedCards.push(dc);
    dealTarget += 1;
  }

  let endingStrs = [``,``];
  let playerHand = [sumPlayer, sumSplit];
  let moneyStr = "";
  let loops = playerSplit? 2 : 1;
  for (let i = 0; i < loops; i++){
    if (playerHand[i] > 21) {
      endingStrs[i] = `Hand: ${i + 1} Dealer wins. P: ${playerHand[i]} D: ${sumDealer} ${uname} bust!`
      betPayout -= betAmnt;
    }
    else if (sumDealer > 21) {
      endingStrs[i] = `Hand: ${i + 1} ${uname} wins! P: ${playerHand[i]} D: ${sumDealer} Dealer bust!`
      betPayout += betAmnt * 2;
    }
    else if (sumDealer > playerHand[i] && sumDealer <= 21){
      endingStrs[i] = `Hand: ${i + 1} Dealer wins. P: ${playerHand[i]} D: ${sumDealer} Dealer closer to 21!`;
      betPayout -= betAmnt;
    }
    
    else if (sumDealer < playerHand[i] && playerHand[i] <= 21){
      endingStrs[i] = `Hand: ${i + 1} ${uname} wins! P: ${playerHand[i]} D: ${sumDealer} ${uname} closer to 21!`;
      betPayout += betAmnt * 2;
    }
    else if (sumDealer == 21){
    endingStrs[i] = `Hand: ${i + 1} ${uname} loses. Dealer had blackjack!`;
    betPayput -= betAmnt;
  }
    else {
      endingStrs[i] = `Hand: ${i + 1} Dealer push! P: ${playerHand[i]} D: ${sumDealer}`;
      betPayout += betAmnt;
    }
    console.log(endingStrs[i]);
  }
  
  if (betPayout > 0){
    moneyStr = `${uname} wins $`;
  }
  else if (betPayout == 0){
    moneyStr = "Dealer push $";
  }
  else
    moneyStr = `${uname} lost $`;
  
  money += betPayout;
  setPlayerScore(money);
  moneyDisplay.textContent = `$${money}`;
  
  endGame(endingStrs[0].concat(`\n` + endingStrs[1]), moneyStr + Math.abs(betPayout));
}

// Add bet action to buttons
chips.forEach(chip => {
  let betWrapper = () => {betHelper(chip.dataset.value);};
  chip.addEventListener("click", betWrapper);
})

const resetBtn = document.getElementById("reset-bet");
resetBtn.addEventListener("click", () => {
  money += betAmnt;
  betAmnt = 0;
  setPlayerScore(money);
  moneyDisplay.textContent = `$${money}`;
  document.getElementById("currency").textContent = `Betting: $0`;
  bjDeal.disabled = true;
});

bjDeal.addEventListener("click", startGame);

let regHit = () => {hit(false);};
let splitHitWrapper = () =>{hit(true);};
bjHit.addEventListener("click", regHit);
bjStand.addEventListener("click", stand);
bjDouble.addEventListener("click", double);
bjSplit.addEventListener("click", split);