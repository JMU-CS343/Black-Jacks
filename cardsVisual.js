let testCard = document.getElementById("playerC1");

// Since cards absolutely positioned, resizing window messes up the image layout
// Need to figure out how to handle this

function setupCard(card){
  // faceHelper(card, "JACK", "CLUBS");
  // ten(card, "SPADES");
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
  card.classList.add("ace");
  img1.style.paddingTop = '40%';
  img1.style.width = '75%';
  img1.src = `card_imgs/${suitStr}.png`;
  card.ariaLabel = `ace of ${suitStr.toLowerCase()}`;
}

function two(card, suitStr){
  let imgs = [];
  let img1 = document.createElement("img");
  imgs.push(img1);
  let img2 = document.createElement("img");
  imgs.push(img2);
  card.classList.add("two");

  for (let img of imgs){
    card.appendChild(img);
    img.style.paddingTop = '14%';
    img.style.width = '55%';
    img.src = `card_imgs/${suitStr}.png`;
  }
  card.ariaLabel = `two of ${suitStr.toLowerCase()}`;
}

function three(card, suitStr){
  let imgs = [];
  let img1 = document.createElement("img");
  imgs.push(img1);
  let img2 = document.createElement("img");
  imgs.push(img2);
  let img3 = document.createElement("img");
  imgs.push(img3);
  card.classList.add("three");

  for (let img of imgs){
    card.appendChild(img);
    img.style.paddingTop = '7%';
    img.style.paddingLeft = '8%';
    img.style.paddingRight = '8%';
    img.style.width = '38%';
    img.src = `card_imgs/${suitStr}.png`;
  }
  card.ariaLabel = `three of ${suitStr.toLowerCase()}`;
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
  card.classList.add("four");

  for (let img of imgs){
    card.appendChild(img);
    img.style.paddingTop = '28%';
    img.style.paddingLeft = '8%';
    img.style.paddingRight = '8%';
    img.style.width = '34%';
    img.src = `card_imgs/${suitStr}.png`;
  }
  card.ariaLabel = `four of ${suitStr.toLowerCase()}`;
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
  card.classList.add("five");

  for (let img of imgs){
    card.appendChild(img);
    img.style.paddingTop = '15%';
    img.style.paddingLeft = '3%';
    img.style.paddingRight = '3%';
    img.style.width = '30%';
    img.src = `card_imgs/${suitStr}.png`;
  }
  card.ariaLabel = `five of ${suitStr.toLowerCase()}`;
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
  card.classList.add("six");

  for (let img of imgs){
    card.appendChild(img);
    img.style.paddingTop = '18%';
    img.style.paddingLeft = '6%';
    img.style.paddingRight = '6%';
    img.style.width = '25%';
    img.src = `card_imgs/${suitStr}.png`;
  }
  card.ariaLabel = `six of ${suitStr.toLowerCase()}`;
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
  card.classList.add("seven");

  for (let img of imgs){
    card.appendChild(img);
    img.style.paddingTop = '10%';
    img.style.paddingLeft = '7%';
    img.style.paddingRight = '7%';
    img.style.width = '23%';
    img.src = `card_imgs/${suitStr}.png`;
  }
  card.ariaLabel = `seven of ${suitStr.toLowerCase()}`;
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
  card.classList.add("eight");

  for (let img of imgs){
    card.appendChild(img);
    img.style.paddingTop = '12%';
    img.style.paddingLeft = '8%';
    img.style.paddingRight = '8%';
    img.style.width = '20%';
    img.src = `card_imgs/${suitStr}.png`;
  }
  card.ariaLabel = `eight of ${suitStr.toLowerCase()}`;
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
  card.classList.add("nine");

  for (let img of imgs){
    card.appendChild(img);
    img.style.paddingTop = '0%';
    img.style.paddingLeft = '9%';
    img.style.paddingRight = '9%';
    img.style.width = '20%';
    img.src = `card_imgs/${suitStr}.png`;
  }
  // Need space above cards, alignment unclean otherwise
  img2.style.paddingTop = '.7vh';
  card.ariaLabel = `nine of ${suitStr.toLowerCase()}`;
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
  card.classList.add("ten");

  for (let img of imgs){
    card.appendChild(img);
    img.style.paddingTop = '0%';
    img.style.width = '19%';
    img.src = `card_imgs/${suitStr}.png`;
  }
  // Double digits require special alignment
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
  card.ariaLabel = `ten of ${suitStr.toLowerCase()}`;
}

// Set the card's image to the corresponding face card
// image files named to match api return strings
function faceHelper(card, cardStr, suitStr) {
  let img = document.createElement("img");
  card.appendChild(img);
  card.classList.add(`${cardStr.toLowerCase()}`);
  img.src = `card_imgs/${cardStr}${suitStr}.png`;
  img.style.width = '70%';
  img.style.paddingTop = "20%";
  img.style.paddingLeft = "9%";
  img.style.paddingRight = "9%";
  card.ariaLabel = `${cardStr.toLowerCase()} of ${suitStr.toLowerCase()}`;
}

// Delete later
setupCard(testCard);