const cardArray = [];
const parrotArray = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];

let cardAmount = 0;
let playerMovesCounter = 0;
let seconds = 0;

let interval;

function countSeconds() {
  const timer = document.querySelector("#timer span");
  timer.innerHTML = seconds;
  seconds++;
}

function shuffleArray() {
  return Math.random() - 0.5;
}

function createCardArray() {

  parrotArray.sort(shuffleArray);

  for (let i = 0; i < cardAmount / 2; i++) {

    const parrot = {
      name: parrotArray[i],
      adress: `./media/${parrotArray[i]}.gif`,
    }

    cardArray.push(parrot);
    cardArray.push(parrot);
  }

  cardArray.sort(shuffleArray);
}

function getHowManyCardsToPlay() {

  cardAmount = prompt("Com quantas cartas quer jogar?");

  while (isNaN(cardAmount) || (cardAmount < 4 || cardAmount > 14) || cardAmount % 2 !== 0) {

    cardAmount = Number(prompt("Digite um número par entre 4 e 14! Não use letras"));

  }

  createCardArray();

  const main = document.querySelector("main");

  for (let i = 0; i < cardArray.length; i++) {
    main.innerHTML += `
      <div class="card ${cardArray[i].name}" onclick="flip(this)">
        <div class="card-inner">
          <div class="card-front">
            <img src="media/card-cover.png" alt="">
          </div>
          <div class="card-back">
            <img src="${cardArray[i].adress}" alt="">
          </div>
        </div>
      </div>`;
  }

  interval = setInterval(countSeconds, 1000)

}

function cardMatch(selectedCards) {

  const firstCard = selectedCards[0].classList.value;
  const secondCard = selectedCards[1].classList.value;

  if (firstCard == secondCard) {
    return true;
  }

  return false;

}

function openCard(card) {

  playerMovesCounter++;

  const selectedCards = document.querySelectorAll(".selected");

  // a variavel selectedCards ainda não está atualizada e mostra apenas 01 elemente no nodeList, por isso < 2

  if (selectedCards.length < 2) {
    card.classList.add("selected");
  }
  closeCards(selectedCards);
}

function closeCards(selectedCards) {

  //necessário para atualizar a variavel e mostrar 2 elementos no nodeList
  selectedCards = document.querySelectorAll(".selected");

  if (selectedCards.length == 2) {

    if (cardMatch(selectedCards)) {
      for (let i = 0; i < selectedCards.length; i++) {
        selectedCards[i].classList.add("match");
      }
    }

    setTimeout(() => {
      for (let i = 0; i < selectedCards.length; i++) {
        selectedCards[i].classList.remove("selected");
      };
    }, 1000);
  }

}

function isGameOver() {
  const matchingCards = document.querySelectorAll(".match");

  if (matchingCards.length == cardArray.length) {

    //limpa o contador
    clearInterval(interval);

    let playAgain = prompt(`Você ganhou em ${playerMovesCounter} jogadas!\nDeseja jogar novamente? sim / não`);

    while (playAgain.toLowerCase() != "sim" && playAgain.toLowerCase() != "não") {
      playAgain = prompt(`Você ganhou em ${playerMovesCounter} jogadas!\nDeseja jogar novamente? sim / não`);
    }

    if (playAgain.toLowerCase() == "sim") {
      clearCardsOnScreen();
      getHowManyCardsToPlay();
      playerMovesCounter = 0;
      seconds = 0;
    }

  }
}

function clearCardsOnScreen() {
  const htmlCards = document.querySelectorAll(".card");

  for (let i = 0; i < htmlCards.length; i++) {
    htmlCards[i].remove();
    cardArray.pop();
  }
}

function flip(card) {

  openCard(card);
  isGameOver();
}

getHowManyCardsToPlay()