import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  card,
  cardImg,
  cardAlt,
  cardCaption,
  cardLikesCounter,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext); // объявили использование контекста

  const isOwn = card.owner._id === currentUser._id; //? Определяем, являемся ли мы владельцем текущей карточки
  const cardDeleteButtonClassName = `button ${
    isOwn
      ? "element__delete element__delete_visible" //если являемся, то добавлаяем класс visible
      : "element__delete"
  }`;
  const isLiked = card.likes.some((like) => like._id === currentUser._id); // определяем, есть ли у кликнутой карточки лайк
  const cardLikeButtonClassName = `element__like button ${
    isLiked ? "element__like_active" : ""
  }`; 

  function handleClick() {
    onCardClick(cardImg, cardCaption);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
    
  }
  return (
    <div className="element">
      <img
        className="element__img"
        src={cardImg}
        alt={cardAlt}
        onClick={handleClick}
      />
      <button
        type="button"
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
      ></button>
      <div className="element__name">
        <h2 className="element__caption">{cardCaption}</h2>
        <div className=" element__like-counter">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
          ></button>
          <div className="element__counter">{cardLikesCounter}</div>
        </div>
      </div>
    </div>
  );
}
export default Card;
