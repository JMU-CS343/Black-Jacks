const hit = document.getElementById("hit-button");
const stand = document.getElementById("stand-button");
const deal = document.getElementById("deal-button");
const split = document.getElementById("split-button");
const double = document.getElementById("double-button");

let deckId = null;
let rem = null;
const shuffleDeck = async () => {
  try {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2');

    if(!response.ok){
      throw new Error("Failed to fetch a deck");
    }

    // Get the json object from the request
    const data = await response.json();
    deckId = data.deckId;
  }
  catch (error) {
    console.error("Failed to shuffle the deck: ", error.message);
  }
};

// Deal a random card, shuffling the decks as needed
// Returns [card number, card suit]
const drawCard = async () => {
  // Ensure original shuffle was successful
  if (!deckId){
    throw new Error("Deck was not shuffled");
  }

  // Shuffle deck if there are no remaining cards
  if (rem == 0) {
    shuffleDeck();
  }

  try{
    const response = await fetch('https://deckofcardsapi.com/api/deck/${deckId}/draw/');

    if (!response.ok){
      throw new Error("Failed to draw a card");
    }
    
    const data = await response.json();
    const value = data.cards.value;
    const suit = data.cards.suit;
    rem = data.remaining;
    return([value, suit]);
  }
  catch (error) {
    console.error("Failed to deal a card: ", error.message);
  }
}