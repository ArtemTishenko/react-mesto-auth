import React from "react";
import { useHistory } from "react-router";
import * as Auth from '../components/Auth.js';
import InfoTooltip from "./InfoTooltip.js";


function Login({onLogin}) {
  const [userData, setUserData] = React.useState({
    password:'',
    email:''
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }
  const history = useHistory();
 
  const handleSubmit = (e) => {
    e.preventDefault();
    let {password, email } = userData;
    console.log("password",password);
    console.log("email",email);

    Auth.authorize(password, email)
        .then((data) => {
          console.log("Login.js autorize .then1 ###data",data)
          if(data.token){
            setUserData({password:'',email:''})
            onLogin();
            history.push("/cards")
            return;
          
          }

        })
        .catch((err) => {
          console.log('err из Login',err)
        });
  

        
  }   

  return (
    <>
    <div className="auth">
      <h1 className="auth__caption">Вход</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="auth__field auth__field_type_email"
          id="auth__field_type_login-email" 
          placeholder="Email"
          required
          minLength="3"
          maxLength="60"
          formNoValidate
          autoComplete="off"
          name="email"
          defaultValue={'artish0100@yandex.ru'}
          onChange={handleChange}
        />
        <input
          type="text"
          className="auth__field auth__field_type_password"
          id="auth__field_type_login-password"
          placeholder="Пароль"
          required
          minLength="3"
          maxLength="60"
          formNoValidate
          autoComplete="off"
          defaultValue={"123"}
          name="password"
          onChange={handleChange}
        />  
        <button type="submit" className="auth__button button">
          Войти
        </button>  
      </form>
    
 
    </div>
   
    </>
  );
}

export default Login;