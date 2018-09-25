const game = document.getElementById("new-game");
const field = document.getElementsByClassName("game")[0];
let cards;

const cardsInfo = {
  urlToFolder: "../images/",
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
  if (e.target.className != "clicked" && !gameInfo.cardChoose) {
    e.target.className = "clicked";
    gameInfo.cardClicked = e.target.name;
    gameInfo.cardChoose = true;
  } else {
    if (cardCheck(e.target.name)) {
      e.target.className = "clicked";
      gameInfo.cardChoose = false;
    }
  }
};

const addCardsToField = () => {
  const { urlToFolder, info } = cardsInfo;
  const { playingField } = gameInfo;
  for (let i = 0; i < playingField.length; i++) {
    field.innerHTML += `<div class="cards"><img src="${urlToFolder +
      info[playingField[i] - 1].url}" class="image" name="${
      info[playingField[i] - 1].id
    }"></div>`;
  }
  cards = document.getElementsByClassName("image");
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
