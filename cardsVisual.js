// EVENTUALLY CHANGE VW/VH TO %
let testCard = document.getElementById("playerC1");

function setupCard(card){
  ace(card);
}

// Have all of these return the imgs array for future use
function ace(card, suitStr){
  let imgs = [];
  let img1 = document.createElement("img");
  imgs.push(img1);
  card.appendChild(imgs[0]);
  img1.style.paddingTop = '3vh';
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
    img.style.paddingTop = '1vh';
    img.style.width = '55%';
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
    img.style.paddingTop = '.2vh';
    img.style.paddingLeft = '.5vw';
    img.style.paddingRight = '.5vw';
    img.style.width = '43%';
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
    img.style.paddingTop = '2vh';
    img.style.paddingLeft = '.2vw';
    img.style.paddingRight = '.2vw';
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
    img.style.paddingTop = '1vh';
    img.style.paddingLeft = '.2vw';
    img.style.paddingRight = '.2vw';
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
    img.style.paddingTop = '1vh';
    img.style.paddingLeft = '.3vw';
    img.style.paddingRight = '.3vw';
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
    img.style.paddingTop = '.8vh';
    img.style.paddingLeft = '.3vw';
    img.style.paddingRight = '.3vw';
    img.style.width = '20%';
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
    img.style.paddingTop = '.8vh';
    img.style.paddingLeft = '.3vw';
    img.style.paddingRight = '.3vw';
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
    img.style.paddingTop = '.2vh';
    img.style.paddingLeft = '.3vw';
    img.style.paddingRight = '.3vw';
    img.style.width = '19%';
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
    img.style.paddingTop = '.4vh';
    img.style.width = '19%';
  }
  // Double digits require special alignment
  // Maybe shrink letter spacing
  img1.style.paddingLeft = '.8vw';
  img1.style.paddingRight = '.2vw';
  img2.style.paddingRight = '.7vw';

  img3.style.paddingLeft = '.8vw';
  img3.style.paddingRight = '.2vw';
  img4.style.paddingRight = '.8vw';

  img5.style.paddingLeft = '.8vw';
  img5.style.paddingRight = '.2vw';
  img6.style.paddingRight = '.8vw';

  img7.style.paddingLeft = '.8vw';
  img7.style.paddingRight = '.2vw';
  img8.style.paddingRight = '.8vw';

  img9.style.paddingLeft = '.8vw';
  img9.style.paddingRight = '.2vw';
  img10.style.paddingRight = '.8vw';
  suitHelper(imgs, suitStr);
}

// Need funcs for jack king queen

function suitHelper(imgs, suitStr){
  switch (suitStr){
    case "SPADES":
      spades(imgs);
      break;
    case "DIAMONDS":
      diamonds(imgs);
      break;
    case "HEARTS":
      hearts(imgs);
      break;
    case "CLUBS":
      clubs(imgs);
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

// need new spade image
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