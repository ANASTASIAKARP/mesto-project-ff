export { createCard, deleteCard, likeCard };
import {
  openModalForImage,
  closeModal,
  closeForOverlayTypeEdit,
} from "../components/modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const popupTypeImage = document.querySelector(".popup_type_image");
popupTypeImage.classList.add("popup_is-animated");

function createCard(card, deleteCard, likeCard, openModalImage) {
  //ф-я создания карточки
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  cardImage.addEventListener("click", function (evt) {
    openModalImage(popupTypeImage, evt);
  });

  const buttonCloseImageModal = popupTypeImage.querySelector(".popup__close"); //переменная кнопка закрытия модального изображения
  buttonCloseImageModal.addEventListener("click", () => {
    closeModal(popupTypeImage);
  });

  popupTypeImage.addEventListener("click", closeForOverlayTypeEdit); //слушатель для оверлея

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
