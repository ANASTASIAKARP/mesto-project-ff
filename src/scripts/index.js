import "../pages/index.css"; //импорт стилей сss
import { initialCards } from "../components/cards.js"; //импорт массива карточек
import { createCard, deleteCard } from "../components/card.js"; //импорт функций карточек

const content = document.querySelector(".content");
const cardContainer = content.querySelector(".places__list");

initialCards.forEach((card) => {
  const newCard = createCard(card, deleteCard);
  cardContainer.append(newCard);
});
