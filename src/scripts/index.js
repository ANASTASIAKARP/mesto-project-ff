import "../pages/index.css"; //импорт стилей сss
import { initialCards } from "../components/cards.js"; //импорт массива карточек
import { createCard, deleteCard, likeCard } from "../components/card.js"; //импорт функций карточек
import {
  openModal,
  closeModal,
  closeForOverlayTypeEdit,
} from "../components/modal.js"; //импорт открытия и закрытия модалок

const content = document.querySelector(".content");
const cardContainer = content.querySelector(".places__list");

const profileEditButton = content.querySelector(".profile__edit-button"); //переменные для редактирования профиля
const popupProfileEdit = document.querySelector(".popup_type_edit");
const closeButtonPopupProfileEdit =
  popupProfileEdit.querySelector(".popup__close");

const profileAddButton = content.querySelector(".profile__add-button"); //переменные для добавления новой карточки
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const closeButtonPopupTypeNewCard =
  popupTypeNewCard.querySelector(".popup__close");

const popupTypeImage = document.querySelector(".popup_type_image");
const buttonCloseImageModal = popupTypeImage.querySelector(".popup__close"); //переменная кнопка закрытия модального изображения

function updateProfileFromFormEdit(evt) {
  //обновление профиля для формы редактировать
  evt.preventDefault(); //отменяет стандартную отправку формы
  const formElement = document.forms["edit-profile"];
  const nameInput = formElement.elements.name.value;
  const jobInput = formElement.elements.description.value;

  document.querySelector(".profile__title").textContent = nameInput;
  document.querySelector(".profile__description").textContent = jobInput;

  closeModal(popupProfileEdit);
}

function addNewCard(evt) {
  //ф-я создания новой карточки
  evt.preventDefault();
  const formElement = document.forms["new-place"];
  const nameInput = formElement.elements["place-name"].value;
  const linkInput = formElement.elements.link.value;

  const newCard = createCard(
    {
      name: nameInput,
      link: linkInput,
    },
    deleteCard,
    likeCard,
    openModalForImage,
    popupTypeImage
  );
  cardContainer.insertBefore(newCard, cardContainer.children[0]); //ставим новую карточку на первое место в списке карточек

  closeModal(popupTypeNewCard);
  formElement.reset(); //убираем все данные с формы добавления новой карточки после
}

function openModalEditProfile(element) {
  //ф-я открытия модалки редактирования профиля
  const name = document.querySelector(".profile__title").textContent;
  const description = document.querySelector(
    ".profile__description"
  ).textContent;
  element.querySelector(".popup__input_type_name").value = name;
  element.querySelector(".popup__input_type_description").value = description;
  openModal(element);
}

function openModalForImage(element, evt) {
  //ф-я открытия модальногот окна с изображаением
  const popupImage = element.querySelector(".popup__image");
  const alt = evt.target.alt;
  popupImage.src = evt.target.src;
  popupImage.alt = alt;
  openModal(element);
  element.querySelector(".popup__caption").textContent = alt;
}

initialCards.forEach((card) => {
  const newCard = createCard(
    card,
    deleteCard,
    likeCard,
    openModalForImage,
    popupTypeImage
  );
  cardContainer.append(newCard); //перебор массива и создание новой карточки
});

profileEditButton.addEventListener("click", () => {
  //слушатель открытия эдит
  openModalEditProfile(popupProfileEdit);
});

profileAddButton.addEventListener("click", () => {
  //слушатель открытия новой карточки
  openModal(popupTypeNewCard);
});

closeButtonPopupProfileEdit.addEventListener("click", () => {
  //вещаем слушателя на эдит х
  closeModal(popupProfileEdit);
});

popupProfileEdit.addEventListener("click", closeForOverlayTypeEdit); //вещаем слушателя на эдит оверлей

closeButtonPopupTypeNewCard.addEventListener("click", () => {
  closeModal(popupTypeNewCard); //слушатель закрывает модалку новой карточки
});

popupTypeNewCard.addEventListener("click", closeForOverlayTypeEdit); //слушатель закрытия по оверлею

popupProfileEdit.addEventListener("submit", updateProfileFromFormEdit); //слушатель для эдита

popupTypeNewCard.addEventListener("submit", addNewCard); //слушатель для новой карточки

popupProfileEdit.classList.add("popup_is-animated"); //плавное закрытие и открытие попапа эдит
popupTypeNewCard.classList.add("popup_is-animated"); //плавное закрытие и открытие попапа  новой карточки

popupTypeImage.classList.add("popup_is-animated");
buttonCloseImageModal.addEventListener("click", () => {
  closeModal(popupTypeImage);
});

popupTypeImage.addEventListener("click", closeForOverlayTypeEdit); //слушатель для оверлея
