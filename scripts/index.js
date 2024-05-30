const content = document.querySelector(".content");
const cardContainer = content.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function addCard(card, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", function (evt) {
    deleteCard(evt);
  });

  cardContainer.append(cardElement);
}

function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

initialCards.forEach((card) => {
  addCard(card, deleteCard);
});