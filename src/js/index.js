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
  playingField: [1, 3, 2, 4, 1, 2, 3, 4],
  cardClicked: "",
  cardChoose: false,
  gameOver: false
};

const startGame = e => {
  clearField();
  shufflePlayindField();
  addCardsToField();
  addStopButton();
};

const stopGame = e => {
  // if (!gameInfo.gameBegin) {
  //   gameInfo.gameBegin = true;
  //   field.innerHTML = "";
  // }
};

const clearField = () => {
  field.innerHTML = "";
};

const shufflePlayindField = () => {
  for (let i = 4; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let itemAtIndex = gameInfo.playingField[randomIndex];
    gameInfo.playingField[randomIndex] = gameInfo.playingField[i];
    gameInfo.playingField[i] = itemAtIndex;
  }
};

const addCardsToField = () => {
  const { urlToFolder, info } = cardsInfo;
  const { playingField } = gameInfo;
  for (let i = 0; i < playingField.length; i++) {
    field.innerHTML += `
    <div class="flip-container">
        <div class="game-element flipper" id="card_${
          info[playingField[i] - 1].id
        }">
          <div class="front default" >
          </div><div class="back default">
        </div>
      </div>
    </div>`;
  }
  cards = document.getElementsByClassName("game-element");

  for (let i = 0; i < 8; i++) {
    cards[i].addEventListener("click", clickOnTheCard);
  }
};

const addStopButton = () => {};

const clickOnTheCard = e => {
  cardCheck(e);
};

const cardCheck = e => {
  const { id, childNodes } = e.target.parentNode;

  if (e.target.parentNode.className != "game-element flipper flipped") {
    e.target.parentNode.className = "game-element flipper flipped";
    childNodes[2].className = `back default opened-${id.slice(-1)}`;
    if (isCardClicked(id)) {
      e.target.parentNode.className = "game-element flipper flipped disabled";
      cardDisabled(id);
    } else {
    }
  } else {
    e.target.parentNode.className = "game-element flipper";
    gameInfo.cardClicked = "";
  }
};

const cardDisabled = id => {
  cards[id].className = "game-element flipper flipped disabled";
};

const isCardClicked = id => {
  if (id.slice(-1) == gameInfo.cardClicked) {
    return true;
  }
  gameInfo.cardClicked = id.slice(-1);
  return false;
};

game.addEventListener("click", startGame);
