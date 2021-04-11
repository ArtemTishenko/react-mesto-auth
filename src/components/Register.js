import React from "react";
import * as Auth from "../components/Auth.js";
import InfoTooltip from "./InfoTooltip.js";

function Register(props) {
  const [userData, setUserData] = React.useState({
    password: "",
    email: "",
  });
  const [openInfoToolTip, setOpenInfoToolTip] = React.useState(false); // стэйт для отображения информационного соосбщения
  const [statusInfoToolTip, setStatusInfoToolTip] = React.useState(""); //стейт с ошибкой

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value, //записывается в стейт userData знаечния инпутов с атрибутом name // <input nama="email" >
    });
  };
  const closePopup = () => {
    setOpenInfoToolTip(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { password, email } = userData;
    Auth.register(password, email)
      .then((response) => {
        setStatusInfoToolTip(response.status); //стейт для отображения infoToolTip-OK
        return response.json();
      })
      .then((user) => {
        if (user) {
          setOpenInfoToolTip(true); //стейт для отображения infoToolTip
        }
      })
      .catch((err) => {
        setOpenInfoToolTip(true); // стейт для отображения infoToolTip
        setStatusInfoToolTip(err);
        console.log("err в Register", err);
      });
  };

  return (
    <>
      <div className="auth">
        <h1 className="auth__caption">Регистрация</h1>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="auth__field auth__field_type_email"
            id="auth__field_type_register-email"
            placeholder="Email"
            required
            minLength="3"
            maxLength="60"
            formNoValidate
            autoComplete="off"
            name="email"
           
            onChange={handleChange}
          />
          <input
            type="password"
            className="auth__field auth__field_type_password"
            id="auth__field_type_register-password"
            placeholder="Пароль"
            required
            minLength="3"
            maxLength="60"
            formNoValidate
            autoComplete="on"
            name="password"
            
            onChange={handleChange}
          />

          <button type="submit" className="auth__button button">
            Зарегистрироваться
          </button>
        </form>

        <p className="auth__subtitle">
          Уже зарегестрированы?
          <button
            onClick={props.signIn}
            className="auth__subtitle auth__subtitle_link"
          >
            {" "}
            Войти
          </button>
        </p>
      </div>
      <InfoTooltip
        status={statusInfoToolTip}
        isOpen={openInfoToolTip}
        onClose={closePopup}
      />
    </>
  );
}
export default Register;
