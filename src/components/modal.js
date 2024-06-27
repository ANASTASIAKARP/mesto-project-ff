export {
  openModal,
  openModalForImage,
  closeModal,
  closeForOverlayTypeEdit,
  openModalEditProfile,
};

function openModal(element) {
  //ф-я открытия модального окна
  element.classList.add("popup_is-opened");
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", keyDownLisnerEscForCloseModal); //слушатель ловит любые нажатия
}

function closeModal(element) {
  //ф-я удаления модального окна
  element.classList.remove("popup_is-opened");
  document.body.style.overflow = ""; //спрячем
  document.removeEventListener("keydown", keyDownLisnerEscForCloseModal); //удаляем слушателя на нажатие кнопки
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

function keyDownLisnerEscForCloseModal(evt) {
  //клавишей esc с удалением слушателя
  if (evt.key === "Escape") {
    const element = document.querySelector(".popup_is-opened"); //получаем модальное окно
    closeModal(element); //закрываем модальное окно
  }
}

function closeForOverlayTypeEdit(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    //клик по оверлею
    closeModal(document.querySelector(".popup_is-opened"));
  }
}
