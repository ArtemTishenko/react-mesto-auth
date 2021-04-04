import React from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');
;

  function handleChangeName(e) {
    setCardName(e.target.value);
  }
  function handleChangeLink(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: cardName,
      link: cardLink,
    });
     setCardName('');
     setCardLink('');
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__field popup__field_type_card-name"
        id="popup__field-card-name"
        type="text"
        placeholder="Название"
        aria-label="Название"
        name="name"
        required
        minLength="2"
        maxLength="30"
        noValidate
        autoComplete="off"
         value={"" || cardName}
        onChange={handleChangeName}
      />
      <span
        className="popup__field-error"
        id="popup__field-card-name-error"
      ></span>
      <input
        className="popup__field popup__field_type_card-link"
        id="popup__field-card-link"
        type="url"
        placeholder="Ссылка на картинку"
        aria-label="Ссылка на картинку"
        name="link"
        required
        noValidate
        autoComplete="on"
        value={"" || cardLink}
        onChange={handleChangeLink}
      />
      <span
        className="popup__field-error"
        id="popup__field-card-link-error"
      ></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
