// EVENTUALLY CHANGE VW/VH TO %
let testCard = document.getElementById("playerC1");

function setupCard(card){
  five(card);
}

function ace(card){
  let image = document.createElement("img");
  card.appendChild(image);
  image.style.paddingTop = '3vh';
  image.style.width = '75%';
}

function two(card){
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
}

function three(card){
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
}

function four(card){
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

setupCard(testCard);