const content = document.querySelector(".content");
const cardContainer = content.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(card, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function (evt) {
      deleteCard(evt);
    });

  return cardElement;
}

function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

initialCards.forEach((card) => {
  const newCard = createCard(card, deleteCard);
  cardContainer.append(newCard);
});
