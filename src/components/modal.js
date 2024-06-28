export { openModal, closeModal, closeForOverlayTypeEdit };

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
