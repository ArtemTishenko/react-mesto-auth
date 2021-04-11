import logo from '../../src/blocks/header/__logo/logo.svg'
//import ham from '../../src/blocks/header/__hamburger-menu/ham1.svg'

function Header(props) {
    
    const makeHeaderTitle = () => {
      if (props.statusLoggedIn) {
        return 'Выйти'
      } else {
        if (!props.statusSignIn) {
          return 'Зарегистрироваться'
        } else {
          return 'Войти'
        }
      }
    }
  
    return(
      <>
         
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип Mesto"/>
        <div className="header__nav">
          <p className="header__email">{`${props.statusLoggedIn ? props.userEmail.email:''}`}</p>
          <button onClick={props.statusLoggedIn //false
                      ? props.signOut
                      :(props.statusSignIn ?props.signIn :props.signUp)} 
              className="header__sign">
                {makeHeaderTitle()}
          </button>      
        </div>
        <button className="header__hamburger-menu button " ></button>

      </header>
      </>
    )
}
export default Header;
