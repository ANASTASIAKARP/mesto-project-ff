export {createCard, deleteCard, toggleLikeCard, checkLikeOwner};

const cardTemplate = document.querySelector("#card-template").content;

/**
 * Подготовка карточки для её отрисовывания
 * @param card Данные карточки
 * @param deleteCard Метод удаления карточки
 * @param likeCard Метод постановки лайка карточки
 * @param openModalImage Метод открытия карточки на весь экран
 * @param popupTypeImage Модалка карточки на весь экран
 * @param userId Идентификатор пользователя
 * @returns {Node}
 */
function createCard(
    card,
    deleteCard,
    likeCard,
    openModalImage,
    popupTypeImage,
    userId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeCount = card.likes.length;
  const cardElementLikeCount = cardElement.querySelector(".card__like-count");
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const buttonLikeIcon = cardLikeButton.querySelector(".card__like-svg");

  cardElement.id = card._id;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElementLikeCount.textContent = cardLikeCount;

  //Раскрыть изображение на весь экран
  cardImage.addEventListener("click", function (evt) {
    openModalImage(popupTypeImage, evt);
  });

  if (card.owner._id === userId) {
    //слушатель для удаления карточки
    buttonDelete.classList.add('card__delete-button_active')
    buttonDelete
    .addEventListener("click", function (evt) {
      const newCard = evt.target.closest('.card');
      deleteCard(newCard);
    });
  }

  if (checkLikeOwner(card.likes, userId)) {
    toggleLikeCard(buttonLikeIcon);
  }

  cardLikeButton
  .addEventListener("click", function () {
    likeCard(card, cardElementLikeCount);
    toggleLikeCard(buttonLikeIcon);
  });

  return cardElement;
}

/**
 * Удаление карточки с фронта
 * @param card Заполненный шаблон карточки на фронте
 */
function deleteCard(card) {
  card.remove();
}

/**
 * Поставка лайка (закрашивание)
 * @param evt Событие
 */
function toggleLikeCard(buttonLike) {
  //функция лайка
  buttonLike.classList.toggle("card__like-button_is-active");
}

function checkLikeOwner(likes, userId) {
  let res = false;
  likes.forEach((like) => {
    if (like._id === userId) {
      res = true;
    }
  });
  return res;
}
