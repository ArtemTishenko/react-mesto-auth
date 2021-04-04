function Login() {
  return (
    <div className="auth">
      <h1 className="auth__caption">Вход</h1>
      <fieldset className="auth__form" >
        <input
          type="email"
          className="auth__field auth__field_type_email"
          id="auth__field_type_login-email" 
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
          id="auth__field_type_login-password"
          placeholder="Пароль"
          required
          minLength="3"
          maxLength="60"
          formNoValidate
          autoComplete="on"
          
        />  
      </fieldset>
    
      <button type="submit" className="auth__button button">
        Войти
      </button>
    </div>
    
  );
}
export default Login;