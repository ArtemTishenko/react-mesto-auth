import Card from "../components/Card";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext); //подписали на контекст

  return (
    <main className="main">
      <section className="profile">
        <button
          type="button"
          className="profile__avatar-img button"
          onClick={props.onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        ></button>
        <div className="profile__info">
          <div className="profile__info-name-eddit">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__button-info-eddit button"
              aria-label="Редктировать профиль"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__info-job">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__button-add button"
          aria-label="Добавить карточку"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              cardImg={card.link}
              cardAlt={card.name}
              cardCaption={card.name}
              cardLikesCounter={card.likes.length}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}
export default Main;
