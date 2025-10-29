let isAnimated = false;

const deck = document.getElementById('dealer-deck');
const target = document.getElementById('playerC1');
const dealButton = document.getElementById('deal-button');

dealButton.addEventListener("click", () => {
  if (isAnimated){
    return;
  }
  
  const deckRect = deck.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const targetCenterX = targetRect.left + (targetRect.width / 2);
  const targetCenterY = targetRect.top + (targetRect.height / 2);
  const deckCenterX = deckRect.left + (deckRect.width / 2);
  const deckCenterY = deckRect.top + (deckRect.height / 2);
  const deltaX = targetCenterX - deckCenterX;
  const deltaY = targetCenterY - deckCenterY;

  deck.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(180deg)`;
  isAnimated = true;
});