let isAnimated = false;
const dealButton = document.getElementById('deal-button');
const deck = document.getElementsByClassName('dealer-deck')[0];

let target = document.getElementById('playerC1');

// Given a target, changes the default location for 
// cards to be dealt to
function changeTargetCard(targetId){
  if (targetId == "" || targetId == undefined){
    console.log("No target indicated");
    return;
  }
  target = document.getElementById(targetId);
  isAnimated = false;
}

dealButton.addEventListener("click", () => {
  if (isAnimated){
    return;
  }

  const deckRect = deck.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  // Create a copy of the deck to use as an unflipped dealt card and set overtop of deck
  const copy = deck.cloneNode(true);
  copy.classList.add('copy');
  document.body.appendChild(copy);
  copy.style.left = `${deckRect.left + window.scrollX}px`;
  copy.style.top = `${deckRect.top + window.scrollY}px`;

  // Copy bounding slightly different from deck
  const copyRect = copy.getBoundingClientRect();

  const targetCenterX = targetRect.left + (targetRect.width / 2);
  const targetCenterY = targetRect.top + (targetRect.height / 2);
  const deckCenterX = copyRect.left + (copyRect.width / 2);
  const deckCenterY = copyRect.top + (copyRect.height / 2);
  const deltaX = targetCenterX - deckCenterX;
  const deltaY = targetCenterY - deckCenterY;

  // Deal the card to the corresponding location
  copy.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(180deg)`;
  // Maybe call another function that sets the appearance of the target card
  // Implementation would be:
  // Keep all undealt card slots invisible
  // When a card is "dealt", change the appearance of the corresponding card on the table
  // (changing playerC1 to be an ace of hearts for example), once this is done make the card visible

  // "Flip" the card after 1.5 seconds
  setTimeout(() => {
    copy.remove();
  }, 1500);
  isAnimated = true;
});