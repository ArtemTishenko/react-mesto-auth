function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_img ${
        props.card.isOpen ? "popup_visible" : " "
      } `}
    >
      <div
        className="popup__container popup__container-img"
        name="popup-picture"
      >
        <button
          type="button"
          className="popup__button-close popup__button-close_type_img button"
          aria-label="Закрыть"
          id="popup__button-close_img"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__picture"
          src={`${props.card.linkCard.linkCard}`}
          alt={`${props.card.nameCard.nameCard}`}
        />
        <p className="popup__picture-caption">{`${props.card.nameCard.nameCard}`}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
