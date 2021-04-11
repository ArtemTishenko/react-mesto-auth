import React from "react";
import logo from "../../src/blocks/header/__logo/logo.svg";
//import ham from '../../src/blocks/header/__hamburger-menu/ham1.svg'

function Header(props) {
  const [showHamburgerMenu, setShowHamburgerMenu] = React.useState(false);
  const makeHeaderTitle = () => {
    if (props.statusLogedIn) {
      return "Выйти";
    } else {
      if (!props.statusSignIn) {
        return "Зарегистрироваться";
      } else {
        return "Войти";
      }
    }
  };

  function clickHamburger() {
    if (showHamburgerMenu) {
      setShowHamburgerMenu(false);
    } else {
      setShowHamburgerMenu(true);
    }
  }

  return (
    <>
      <header className="header">
        <div
          className={`header__nav header__nav-mobile ${
            showHamburgerMenu ? "header__nav-mobile_visible" : ""
          }`}
        >
          <p className="header__email header__email_type_mobile">{`${
            props.statusLogedIn ? props.userEmail.email : ""
          }`}</p>
          <button
            className="header__sign header__sign_type_mobile"
            onClick={
              props.statusLogedIn //false
                ? props.signOut
                : props.statusSignIn
                ? props.signIn
                : props.signUp
            }
          >
            {makeHeaderTitle()}
          </button>
        </div>
        <div className="header__content">
          <img className="header__logo" src={logo} alt="Логотип Mesto" />
          <div className="header__nav">
            <p className="header__email">{`${
              props.statusLogedIn ? props.userEmail.email : ""
            }`}</p>
            <button
              onClick={
                props.statusLogedIn //false
                  ? props.signOut
                  : props.statusSignIn
                  ? props.signIn
                  : props.signUp
              }
              className="header__sign"
            >
              {makeHeaderTitle()}
            </button>
            <button
              className={`header__hamburger-menu button ${
                showHamburgerMenu ? "header__hamburger-menu_close" : ""
              }`}
              onClick={clickHamburger}
            ></button>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
