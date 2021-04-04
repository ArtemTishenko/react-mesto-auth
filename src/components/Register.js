
function Register() {
  return (
    <>
      
      <div className="auth">
        <h1 className="auth__caption">Регистрация</h1>
        <fieldset className="auth__form" >
          <input
            type="email"
            className="auth__field auth__field_type_email"
            id="auth__field_type_register-email" 
            placeholder="Email"
            required
            minLength="3"
            maxLength="60"
            formNoValidate
            autoComplete="on"
            
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
            
          />  
        </fieldset>
      
        <button type="submit" className="auth__button button">
          Зарегистрироваться
        </button>
        <p className="auth__subtitle">Уже зарегестрированы? 
          <a className="auth__subtitle auth__subtitle_link"> Войти</a>
        </p>
      </div>
      </>
   
    
  );
}
export default Register;