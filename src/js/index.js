const game = document.getElementById("new-game");
const field = document.getElementsByClassName("game-field")[0];
const setting = document.getElementById("settings");
let cards;

const gameData = {
  playingField: [1, 3, 2, 4, 1, 2, 3, 4],
  cardSelected: "",
  cardCount: 2,
  gameOver: 4
};

const startGame = e => {
  clearField();
  shuffleCardPack();
  addCardsToField();
  gameData.cardSelected = "";
  gameData.cardCount = 2;
};

const stopGame = e => {};

const clearField = () => {
  field.innerHTML = "";
};

const shuffleCardPack = () => {
  for (let i = 7; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let itemAtIndex = gameData.playingField[randomIndex];
    gameData.playingField[randomIndex] = gameData.playingField[i];
    gameData.playingField[i] = itemAtIndex;
  }
};

const addCardsToField = () => {
  const { playingField } = gameData;

  for (let i = 0; i < playingField.length; i++) {
    field.innerHTML += `
    <div class="flip-container">
        <div class="game-element flipper" id="card_${playingField[i]}">
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

const isSelectedTwoCard = id => {
  const { cardSelected, playingField } = gameData;

  if (id == cardSelected) {
    for (let i = 0; i < playingField.length; i++) {
      if (cards[i].id == id || cards[i].id == cardSelected) {
        cards[i].className = "game-element flipper flipped disabled";
      }
    }
    gameData.cardCount = 2;
  } else {
    for (let i = 0; i < playingField.length; i++) {
      if (cards[i].id == id || cards[i].id == cardSelected) {
        cards[i].className = "game-element flipper";
      }
    }
    gameData.cardCount = 2;
  }
};

const clickOnTheCard = e => {
  const { className, id, childNodes } = e.target.parentNode;

  if (className == "game-element flipper" && gameData.cardCount == 2) {
    e.target.parentNode.className = "game-element flipper flipped";
    childNodes[2].className = `back default opened-${id.slice(-1)}`;
    gameData.cardSelected = id;
    gameData.cardCount--;
  } else if (gameData.cardCount == 1) {
    e.target.parentNode.className = "game-element flipper flipped";
    childNodes[2].className = `back default opened-${id.slice(-1)}`;
    gameData.cardCount--;
    setTimeout(isSelectedTwoCard, 1000, id);
  }
};

const cardDisabled = id => {
  cards[id].className = "game-element flipper flipped disabled";
};

const isCardClicked = id => {
  if (id == gameData.cardSelected) {
    return true;
  }
  gameData.cardSelected = id;
  return false;
};

const addTheSettingsMenu = e => {
  e.target.parentNode.innerHTML += `<div id="animation"></div>`;
};

game.addEventListener("click", startGame);
settings.addEventListener("click", addTheSettingsMenu);
