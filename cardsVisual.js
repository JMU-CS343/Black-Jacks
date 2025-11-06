let testCard = document.getElementById("playerC1");

// This may be useless
function setupCard(card){
  // faceHelper(testCard, "KING", "CLUBS");
  // ace(testCard, "HEARTS");
}

// DOCUMENTATION FOR ALL CARD FUNCS:
// Create an array of img elems with length being the card number
// Add number images to the array so they can be looped over
// and added as childeren to the card div, editing style as necessary
function ace(card, suitStr){
  let imgs = [];
  let img1 = document.createElement("img");
  imgs.push(img1);
  card.appendChild(imgs[0]);
  img1.style.paddingTop = '29%';
  img1.style.width = '75%';
  suitHelper(imgs, suitStr);
}

function two(card, suitStr){
  let imgs = [];
  let img1 = document.createElement("img");
  imgs.push(img1);
  let img2 = document.createElement("img");
  imgs.push(img2);

  for (let img of imgs){
    card.appendChild(img);
    img.style.paddingTop = '9%';
    img.style.width = '55%';
    // need to rename all card imgs but could replace helper methods
    // would remove need for suit helper and suit methods
    // img.src = `card_imgs/${suitStr}`
  }
  suitHelper(imgs, suitStr);
}

function three(card, suitStr){
  let imgs = [];
  let img1 = document.createElement("img");
  imgs.push(img1);
  let img2 = document.createElement("img");
  imgs.push(img2);
  let img3 = document.createElement("img");
  imgs.push(img3);

  for (let img of imgs){
    card.appendChild(img);
    img.style.paddingTop = '3%';
    img.style.paddingLeft = '8%';
    img.style.paddingRight = '8%';
    img.style.width = '38%';
  }
  suitHelper(imgs, suitStr);
}

function four(card, suitStr){
  let imgs = [];
  let img1 = document.createElement("img");
  imgs.push(img1);
  let img2 = document.createElement("img");
  imgs.push(img2);
  let img3 = document.createElement("img");
  imgs.push(img3);
  let img4 = document.createElement("img");
  imgs.push(img4);

  for (let img of imgs){
    card.appendChild(img);
    img.style.paddingTop = '24%';
    img.style.paddingLeft = '8%';
    img.style.paddingRight = '8%';
    img.style.width = '30%';
  }
  suitHelper(imgs, suitStr);
}

function five(card, suitStr){
  let imgs = [];
  let img1 = document.createElement("img");
  imgs.push(img1);
  let img2 = document.createElement("img");
  imgs.push(img2);
  let img3 = document.createElement("img");
  imgs.push(img3);
  let img4 = document.createElement("img");
  imgs.push(img4);
  let img5 = document.createElement("img");
  imgs.push(img5);

  for (let img of imgs){
    card.appendChild(img);
    img.style.paddingTop = '11%';
    img.style.paddingLeft = '3%';
    img.style.paddingRight = '3%';
    img.style.width = '28%';
  }
  suitHelper(imgs, suitStr);
}

function six(card, suitStr){
  let imgs = [];
  let img1 = document.createElement("img");
  imgs.push(img1);
  let img2 = document.createElement("img");
  imgs.push(img2);
  let img3 = document.createElement("img");
  imgs.push(img3);
  let img4 = document.createElement("img");
  imgs.push(img4);
  let img5 = document.createElement("img");
  imgs.push(img5);
  let img6 = document.createElement("img");
  imgs.push(img6);

  for (let img of imgs){
    card.appendChild(img);
    img.style.paddingTop = '13%';
    img.style.paddingLeft = '6%';
    img.style.paddingRight = '6%';
    img.style.width = '25%';
  }
  suitHelper(imgs, suitStr);
}

function seven(card, suitStr){
  let imgs = [];
  let img1 = document.createElement("img");
  imgs.push(img1);
  let img2 = document.createElement("img");
  imgs.push(img2);
  let img3 = document.createElement("img");
  imgs.push(img3);
  let img4 = document.createElement("img");
  imgs.push(img4);
  let img5 = document.createElement("img");
  imgs.push(img5);
  let img6 = document.createElement("img");
  imgs.push(img6);
  let img7 = document.createElement("img");
  imgs.push(img7);

  for (let img of imgs){
    card.appendChild(img);
    img.style.paddingTop = '8%';
    img.style.paddingLeft = '7%';
    img.style.paddingRight = '7%';
    img.style.width = '21%';
  }
  suitHelper(imgs, suitStr);
}

function eight(card, suitStr){
  let imgs = [];
  let img1 = document.createElement("img");
  imgs.push(img1);
  let img2 = document.createElement("img");
  imgs.push(img2);
  let img3 = document.createElement("img");
  imgs.push(img3);
  let img4 = document.createElement("img");
  imgs.push(img4);
  let img5 = document.createElement("img");
  imgs.push(img5);
  let img6 = document.createElement("img");
  imgs.push(img6);
  let img7 = document.createElement("img");
  imgs.push(img7);
  let img8 = document.createElement("img");
  imgs.push(img8);

  for (let img of imgs){
    card.appendChild(img);
    img.style.paddingTop = '8%';
    img.style.paddingLeft = '8%';
    img.style.paddingRight = '8%';
    img.style.width = '20%';
  }
  suitHelper(imgs, suitStr);
}

function nine(card, suitStr){
  let imgs = [];
  let img1 = document.createElement("img");
  imgs.push(img1);
  let img2 = document.createElement("img");
  imgs.push(img2);
  let img3 = document.createElement("img");
  imgs.push(img3);
  let img4 = document.createElement("img");
  imgs.push(img4);
  let img5 = document.createElement("img");
  imgs.push(img5);
  let img6 = document.createElement("img");
  imgs.push(img6);
  let img7 = document.createElement("img");
  imgs.push(img7);
  let img8 = document.createElement("img");
  imgs.push(img8);
  let img9 = document.createElement("img");
  imgs.push(img9);

  for (let img of imgs){
    card.appendChild(img);
    img.style.paddingTop = '0%';
    img.style.paddingLeft = '9%';
    img.style.paddingRight = '9%';
    img.style.width = '20%';
  }
  // Need space above cards, alignment unclean otherwise
  img2.style.paddingTop = '.7vh';
  suitHelper(imgs, suitStr);
}

function ten(card, suitStr){
  let imgs = [];
  let img1 = document.createElement("img");
  imgs.push(img1);
  let img2 = document.createElement("img");
  imgs.push(img2);
  let img3 = document.createElement("img");
  imgs.push(img3);
  let img4 = document.createElement("img");
  imgs.push(img4);
  let img5 = document.createElement("img");
  imgs.push(img5);
  let img6 = document.createElement("img");
  imgs.push(img6);
  let img7 = document.createElement("img");
  imgs.push(img7);
  let img8 = document.createElement("img");
  imgs.push(img8);
  let img9 = document.createElement("img");
  imgs.push(img9);
  let img10 = document.createElement("img");
  imgs.push(img10);

  for (let img of imgs){
    card.appendChild(img);
    img.style.paddingTop = '2%';
    img.style.width = '19%';
  }
  // Double digits require special alignment
  // Maybe shrink letter spacing
  img1.style.paddingLeft = '20%';
  img1.style.paddingRight = '5%';
  img2.style.paddingRight = '19%';

  img3.style.paddingLeft = '20%';
  img3.style.paddingRight = '5%';
  img4.style.paddingRight = '19%';

  img5.style.paddingLeft = '20%';
  img5.style.paddingRight = '5%';
  img6.style.paddingRight = '19%';

  img7.style.paddingLeft = '20%';
  img7.style.paddingRight = '5%';
  img8.style.paddingRight = '19%';

  img9.style.paddingLeft = '20%';
  img9.style.paddingRight = '5%';
  img10.style.paddingRight = '19%';
  suitHelper(imgs, suitStr);
}

// Set the card's image to the corresponding face card
// image files named to match api return strings
function faceHelper(card, cardStr, suitStr) {
  let img = document.createElement("img");
  card.appendChild(img);
  img.src = `card_imgs/${cardStr}${suitStr}.png`;
  img.style.width = '70%';
  img.style.paddingTop = "9%";
  img.style.paddingLeft = "9%";
  img.style.paddingRight = "9%";
}

function suitHelper(imgs, suitStr){
  switch (suitStr){
    case "SPADES":
      spade(imgs);
      break;
    case "DIAMONDS":
      diamond(imgs);
      break;
    case "HEARTS":
      heart(imgs);
      break;
    case "CLUBS":
      club(imgs);
      break;
  }
}

function heart(imgs){
  for (let img of imgs){
    img.src = "card_imgs/heart.png";
  }
}

function diamond(imgs){
  for (let img of imgs){
    img.src = "card_imgs/diamond.png";
  }
}

function spade(imgs){
  for (let img of imgs){
    img.src = "card_imgs/spade.png";
  }
}

function club(imgs){
  for (let img of imgs){
    img.src = "card_imgs/club.png";
  }
}

// Delete later
setupCard(testCard);