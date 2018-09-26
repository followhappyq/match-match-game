const game = document.getElementById("new-game");
const field = document.getElementsByClassName("game-field")[0];
let cards;

const cardsInfo = {
  urlToFolder: "../images/",
  shirt: "shirt.png",
  info: [
    {
      id: 1,
      name: "Alice",
      url: "alice.png"
    },
    {
      id: 2,
      name: "Amon Ra",
      url: "amonra.png"
    },
    {
      id: 3,
      name: "Baphomet",
      url: "baphomet.png"
    },
    {
      id: 4,
      name: "Wild Cat",
      url: "wild.png"
    }
  ]
};

const gameInfo = {
  gameBegin: false,
  playingField: [1, 3, 2, 4, 1, 2, 4, 3],
  cardClicked: "",
  cardChoose: false,
  gameOver: false
};

const cardCheck = num => {
  if (gameInfo.cardClicked == num) {
    return true;
  }
  return false;
};

const clickOnTheCard = e => {
  e.target.className = "front default opened";
  console.log(e.target);
};

const addCardsToField = () => {
  const { urlToFolder, info } = cardsInfo;
  const { playingField } = gameInfo;
  for (let i = 0; i < playingField.length; i++) {
    field.innerHTML += `<div class="flip-container"><div class="game-element" id="card_${
      info[playingField[i] - 1].id
    }"><div class="front default"></div></div></div>`;
  }
  cards = document.getElementsByClassName("game-element");
  for (let i = 0; i < 8; i++) {
    cards[i].addEventListener("click", clickOnTheCard);
  }
};

const addStopButton = () => {};

const startGame = e => {
  if (!gameInfo.gameBegin) {
    gameInfo.gameBegin = true;
    addCardsToField();
    addStopButton();
  }
};

const stopGame = e => {
  if (!gameInfo.gameBegin) {
    gameInfo.gameBegin = true;
    field.innerHTML = "";
  }
};

game.addEventListener("click", startGame);
