const cardList = [];
let delay = 0;

function howManyCards() {
  // ALTERAR DEPOIS
  const cardAmount = 6;
  // const cardAmount = Number(document.querySelector("#number").value);
  const main = document.querySelector("main");
  const label = document.querySelector("label")

  if (cardAmount % 2 !== 0) {
    label.innerText = "Digite um número par!";
  } else {
    document.querySelector(".overlay").classList.add("hidden");
  }

  for (let i = 0; i < cardAmount; i++) {
    main.innerHTML += `<div class="card" onclick="rotate(this)"><div class="card-inner"><div class="card-front"><img src="media/card-cover.png" alt=""></div><div class="card-back"><img src="media/unicornparrot.gif" alt=""></div>
    </div>
  </div>`;
  }

}

function openCard(card) {
  card.classList.add("selected");
}

function closeCards(openedCards) {
  for (let i = 0; i < openedCards.length; i++) {
    openedCards[i].classList.remove("selected");
  }
}

function rotate(card) {
  const openedCards = document.querySelectorAll(".selected");

  if (openedCards.length >= 2) {
    closeCards(openedCards);
    delay = 300;
  }

  setTimeout(() => {
    openCard(card);

  }, delay);
  delay = 0;

}