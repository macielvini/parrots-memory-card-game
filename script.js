const cardArray = [];
const parrotArray = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];
let cardAmount = 8;

//embaralha o array
function randomizer() {
  return Math.random() - 0.5;
}

function cardGenerator() {

  parrotArray.sort(randomizer);

  for (let i = 0; i < cardAmount / 2; i++) {

    const parrot = {
      name: parrotArray[i],
      adress: `./media/${parrotArray[i]}.gif`,
    }

    cardArray.push(parrot);
    cardArray.push(parrot);
  }

  cardArray.sort(randomizer);
}

function modal() {

  cardAmount = Number(document.querySelector("#number").value);

  cardGenerator();

  const main = document.querySelector("main");
  const label = document.querySelector("label")

  if (cardAmount % 2 !== 0) {
    label.innerHTML = `Digite um número <span>par!</span>`;

  } else {
    document.querySelector(".overlay").classList.add("hidden");

    for (let i = 0; i < cardArray.length; i++) {
      main.innerHTML += `
      <div class="card ${cardArray[i].name}" onclick="rotate(this)">
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
  }
}

function matchCards(selectedCards) {

  const firstCard = selectedCards[0].classList.value;
  const secondCard = selectedCards[1].classList.value;

  if (firstCard == secondCard) {
    return true;
  }

  return false;

}

function openCard(card) {

  card.classList.add("selected");

  closeCards();
}

function closeCards() {

  const selectedCards = document.querySelectorAll(".selected");

  if (selectedCards.length == 2) {

    if (matchCards(selectedCards)) {
      for (let i = 0; i < selectedCards.length; i++) {
        selectedCards[i].classList.add("match");
      }
    } else {
      setTimeout(() => {
        for (let i = 0; i < selectedCards.length; i++) {
          selectedCards[i].classList.remove("selected");
        };
      }, 1000);
    }
  }
}

function rotate(card) {

  openCard(card);

}