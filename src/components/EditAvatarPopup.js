import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = ""; //для сброса input после отправки данных аватара на сервер
  }
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить Аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__field popup__field_type_avatar-link"
        id="popup__field-avatar-link"
        type="url"
        placeholder="Ссылка на картинку"
        aria-label="Ссылка на картинку"
        name="avatar"
        required
        noValidate
        autoComplete="on"
        ref={avatarRef}
      />
      <span
        className="popup__field-error"
        id="popup__field-avatar-link-error"
      ></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
