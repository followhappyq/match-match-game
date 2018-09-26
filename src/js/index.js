const game = document.getElementById("new-game");
const field = document.getElementsByClassName("game-field")[0];
let cards;

const gameInfo = {
  playingField: [1, 3, 2, 4, 1, 2, 3, 4],
  cardClicked: "",
  cardChoose: false,
  gameOver: false
};

const startGame = e => {
  clearField();
  shuffleCardPack();
  addCardsToField();
  addStopButton();
};

const stopGame = e => {};

const clearField = () => {
  field.innerHTML = "";
};

const shuffleCardPack = () => {
  for (let i = 7; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let itemAtIndex = gameInfo.playingField[randomIndex];
    gameInfo.playingField[randomIndex] = gameInfo.playingField[i];
    gameInfo.playingField[i] = itemAtIndex;
  }
};

const addCardsToField = () => {
  const { playingField } = gameInfo;

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
    console.log(cards[i]);
  }
};

const addStopButton = () => {};

const clickOnTheCard = e => {
  const { id, childNodes } = e.target.parentNode;

  if (e.target.parentNode.className != "game-element flipper flipped") {
    e.target.parentNode.className = "game-element flipper flipped";
    childNodes[2].className = `back default opened-${id.slice(-1)}`;
  } else {
    e.target.parentNode.className = "game-element flipper";
    gameInfo.cardClicked = "";
  }
};

const cardDisabled = id => {
  cards[id].className = "game-element flipper flipped disabled";
};

const isCardClicked = id => {
  if (id == gameInfo.cardClicked) {
    return true;
  }
  gameInfo.cardClicked = id;
  return false;
};

game.addEventListener("click", startGame);
