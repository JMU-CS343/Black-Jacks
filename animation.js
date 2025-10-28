const deck = document.getElementById('dealer-deck');
const target = document.getElementById('playerC1');
const dealButton = document.getElementById('deal-button');

dealButton.addEventListener("click", () => {
  const deckRect = deck.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const deltaX = targetRect.left - deckRect.left;
  const deltaY = targetRect.top - deckRect.top;
  deck.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(180deg)`;
});