import "../pages/index.css"; //импорт стилей сss
import {checkLikeOwner, createCard, deleteCard} from "../components/card.js"; //импорт функций карточек
import {
  closeForOverlayTypeEdit,
  closeModal,
  openModal,
} from "../components/modal.js"; //импорт открытия и закрытия модалок
import * as api from "../components/api.js";
import {clearValidation, enableValidation} from "../components/validation.js";

const validConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  errorSelector: ".form__input-error",
};

const SAVING = 'Сохранение...';
const SAVE = 'Сохранить';

const content = document.querySelector(".content");
const cardContainer = content.querySelector(".places__list");

const profileEditButton = content.querySelector(".profile__edit-button"); //переменные для редактирования профиля
const popupProfileEdit = document.querySelector(".popup_type_edit");
const closeButtonPopupProfileEdit =
    popupProfileEdit.querySelector(".popup__close");
const profileEditForm = document.forms.edit_profile;
const buttonSubmitPopupProfileEdit = popupProfileEdit.querySelector(
    ".popup__button");

const profileAddButton = content.querySelector(".profile__add-button"); //переменные для добавления новой карточки
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const closeButtonPopupTypeNewCard =
    popupTypeNewCard.querySelector(".popup__close");
const newPlaceForm = document.forms.new_place;
const buttonSubmitPopupTypeNewCard = popupTypeNewCard.querySelector(
    ".popup__button");

const popupTypeImage = document.querySelector(".popup_type_image");
const buttonCloseImageModal = popupTypeImage.querySelector(".popup__close"); //переменная кнопка закрытия модального изображения

const popupDeleteCard = document.querySelector(".popup_type_delete_card");
const buttonClosePopupDeleteCard = popupDeleteCard.querySelector(
    ".popup__close");
const buttonConfirmationDeleteCard = popupDeleteCard.querySelector(
    ".popup__confirmation");
const profile = document.querySelector(".profile");

const userAvatar = profile.querySelector(".profile__image");
const profileAvatar = profile.querySelector(".profile__avatar");
const modalEditUserAvatar = document.querySelector(".popup_type_edit-avatar");
const buttonCloseModalEditUserAvatar = modalEditUserAvatar.querySelector(
    ".popup__close");
const buttonSubmitEditUserAvatar = modalEditUserAvatar.querySelector(
    ".popup__button")
const editAvatarForm = document.forms.edit_avatar;

let userId = '';

//обновление профиля для формы редактировать
function updateProfileFromFormEdit(evt) {
  evt.preventDefault(); //отменяет стандартную отправку формы
  buttonSubmitPopupProfileEdit.textContent = SAVING;
  const formElement = document.forms.edit_profile;
  const nameInput = formElement.elements.name.value;
  const jobInput = formElement.elements.description.value;
  api.updateUserInform({name: nameInput, about: jobInput})
  .then((result) => {
    fillingUserData(result);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    closeModal(popupProfileEdit);
    buttonSubmitPopupProfileEdit.textContent = SAVE;
  });
}

fillingData();

function fillingData() {
  Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfoResponse, cardsResponse]) => {
    fillingUserData(userInfoResponse);
    fillingCardsData(cardsResponse);
  })
  .catch((err) => {
    console.log(err);
  });
}

function fillingUserData(userInfoResponse) {
  userAvatar.src = userInfoResponse.avatar;
  profile.querySelector(".profile__title").textContent = userInfoResponse.name;
  profile.querySelector(
      ".profile__description").textContent = userInfoResponse.about;
  userId = userInfoResponse._id;
}

function addNewCard(evt) {
  //ф-я создания новой карточки
  evt.preventDefault();
  buttonSubmitPopupTypeNewCard.textContent = SAVING;
  const formElement = document.forms.new_place;
  const nameInput = formElement.elements["place-name"].value;
  const linkInput = formElement.elements.link.value;

  api.addNewCard({name: nameInput, link: linkInput})
  .then((result) => {
    const newCard = createCard(result, openModalForDeleteCard, likedCard,
        openModalForImage,
        popupTypeImage, userId);
    cardContainer.insertBefore(newCard, cardContainer.children[0]); //ставим новую карточку на первое место в списке карточек
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    closeModal(popupTypeNewCard);
    formElement.reset();
    buttonSubmitPopupTypeNewCard.textContent = SAVE;
  });
}

function openModalEditProfile(element) {
  //ф-я открытия модалки редактирования профиля
  clearValidation(validConfig, profileEditForm);
  const name = document.querySelector(".profile__title").textContent;
  const description = document.querySelector(
      ".profile__description"
  ).textContent;
  element.querySelector(".popup__input_type_name").value = name;
  element.querySelector(".popup__input_type_description").value = description;
  openModal(element);
}

function openModalForDeleteCard(card) {
  openModal(popupDeleteCard);
  buttonConfirmationDeleteCard.addEventListener('click',
      () => confirmationDeleteCard(card, popupDeleteCard));
}

function confirmationDeleteCard(card, deleteModal) {
  api.deleteCard(card.id)
  .then(() => {
    deleteCard(card);
    closeModal(deleteModal);
  })
  .catch((err) => {
    console.log(err);
  });
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

function fillingCardsData(cardList) {
  cardList.forEach((card) => {
    const newCard = createCard(
        card,
        openModalForDeleteCard,
        likedCard,
        openModalForImage,
        popupTypeImage,
        userId
    );
    cardContainer.append(newCard); //перебор массива и создание новой карточки
  });
}

function updateAvatar(evt) {
  evt.preventDefault();
  buttonSubmitEditUserAvatar.textContent = SAVING;
  const editAvatar = document.forms.edit_avatar;
  api.updateAvatar(editAvatar.link.value)
  .then((result) => {
    fillingUserData(result);
    closeModal(modalEditUserAvatar);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => (buttonSubmitEditUserAvatar.textContent = SAVE));

}

enableValidation(validConfig);

function likedCard(card, cardLikeCount) {
  debugger;
  if (checkLikeOwner(card.likes, userId)) {
    api.deleteLikeCard(card._id)
    .then((res) => updateLikedCard(res, card, cardLikeCount))
    .catch((err) => {
      console.log(err);
    });
  } else {
    api.addLikeCard(card._id)
    .then((res) => updateLikedCard(res, card, cardLikeCount))
    .catch((err) => {
      console.log(err);
    });
  }

}

function updateLikedCard(data, card, count) {
  card.likes = data.likes;
  count.textContent = card.likes.length;
}

profileEditButton.addEventListener("click", () => {
  //слушатель открытия эдит
  openModalEditProfile(popupProfileEdit);
});

profileAddButton.addEventListener("click", () => {
  //слушатель открытия новой карточки
  clearValidation(validConfig, newPlaceForm);
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

buttonClosePopupDeleteCard.addEventListener("click", () => {
  closeModal(popupDeleteCard);
});

popupDeleteCard.addEventListener("click", closeForOverlayTypeEdit);

profileAvatar.addEventListener('click', () => {
  clearValidation(validConfig, editAvatarForm);
  openModal(modalEditUserAvatar);
});

buttonCloseModalEditUserAvatar.addEventListener("click", () => {
  closeModal(modalEditUserAvatar);
});

modalEditUserAvatar.addEventListener("click", closeForOverlayTypeEdit);

modalEditUserAvatar.addEventListener("submit", updateAvatar);




