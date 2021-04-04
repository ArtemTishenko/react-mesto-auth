import logo from '../../src/blocks/header/__logo/logo.svg'
import ham from '../../src/blocks/header/__hamburger-menu/ham1.svg'
function Header() {
    return(
      <>
         
      <header className="header">
      <div className="header__nav">
            <p className="header__email">youremail@mail.ru</p>
            <a className="header__sign">Войти/Зарегистрироваться</a>
            
          </div>
          <img className="header__logo" src={logo} alt="Логотип Mesto"/>
      
          <button className="header__hamburger-menu button " ></button>

      </header>
      </>
    )
}
export default Header;