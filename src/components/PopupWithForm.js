function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_visible" : " "
      }`}
    >
      <form
        onSubmit={props.onSubmit}
        className={`popup__container popup__container_type_form popup__container_type_${props.name}`}
        name={`${props.name}`}
      >
        <button
          type="button"
          className={`popup__button-close popup__button-close_type_${props.name} button`}
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__caption popup__caption_type_card ">{`${props.title}`}</h2>
        <fieldset className="popup__form">{props.children}</fieldset>
        <button type="submit" className="popup__button-submit button">
          Сохранить
        </button>
      </form>
    </div>
  );
}
export default PopupWithForm;
