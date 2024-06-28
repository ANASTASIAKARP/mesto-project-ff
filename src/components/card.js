export { createCard, deleteCard, likeCard };

const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  card,
  deleteCard,
  likeCard,
  openModalImage,
  popupTypeImage
) {
  //ф-я создания карточки
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  cardImage.addEventListener("click", function (evt) {
    openModalImage(popupTypeImage, evt);
  });

  cardElement
    .querySelector(".card__like-button") //слушатель для лайка
    .addEventListener("click", function (evt) {
      likeCard(evt);
    });

  cardElement
    .querySelector(".card__delete-button") //слушатель для удаления карточки
    .addEventListener("click", function (evt) {
      deleteCard(evt);
    });

  return cardElement;
}

function deleteCard(evt) {
  // функция удаления карточки
  evt.target.closest(".places__item").remove();
}

function likeCard(evt) {
  //функция лайка
  evt.target.classList.add("card__like-button_is-active");
}
