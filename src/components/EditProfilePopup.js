import React, { useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "../components/PopupWithForm";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDiscription] = React.useState(""); // задаем начальное знчение пустую строку, т.к. при первом монитрование записывается undefined
  const currentUser = React.useContext(CurrentUserContext); //подписка на контекст

  useEffect(() => {
    setName(currentUser.name);
    setDiscription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDiscription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-form"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__field popup__field_type_name "
        id="popup__field-eddit-name"
        type="text"
        placeholder="Имя"
        aria-label="Имя"
        name="name"
        required
        minLength="3"
        maxLength="40"
        noValidate
        autoComplete="off"
        value={name}
        onChange={handleChangeName}
      />
      <span
        className="popup__field-error"
        id="popup__field-eddit-name-error"
      ></span>
      <input
        className="popup__field popup__field_type_job"
        id="popup__field-eddit-job"
        type="text"
        placeholder="Профессия"
        aria-label="О себе"
        name="about"
        required
        minLength="2"
        maxLength="200"
        noValidate
        autoComplete="off"
        value={description}
        onChange={handleChangeDescription}
      />
      <span
        className="popup__field-error"
        id="popup__field-eddit-job-error"
      ></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
