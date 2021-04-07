
import React from "react";
import { Link, useHistory } from 'react-router-dom';
import * as Auth from '../components/Auth.js';


function Register() {
  // const [email, setEmail]=React.useState("")
  // const [password, setPassword] =React.useState("")
  const [userData, setUserData] = React.useState({
    password:'',
    email:''
  })
  const [statusInfoToolTip, setStatusInfoToolTip] = React.useState(false) // стэйт для отображения информационного соосбщения
  const history = useHistory();

  const handleChange = (e)=>{
    const {name, value}=e.target
    setUserData({
      ...userData,
      [name]:value //записывается в стейт userData знаечния инпутов с атрибутом name // <input nama="email" >
    })
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    //if (this.state.password === this.state.confirmPassword){
      let {password, email } = userData;
        console.log('email',email)
        console.log('password',password)
       Auth.register(password, email)
        .then((res) => {
         console.log('res - Auth.register',res)
          // if (res.status !== 400){
          //   setStatusInfoToolTip(true)// задаем стейту true, если ошибок нет (использовать этот стейт для отображения infoToolTip c картинкой imgOk )
          //   //history.push('/sign-in')
            
          //   // } 
          // }else{
          //   setStatusInfoToolTip(false) //задаем стейту false, если есть ошибка ответа от сервера (использовать для отображения картинки imgCancel)
          // }
       })
      //  .catch((err)=>{console

      //  }) 
  } 
      

  return(
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
            autoComplete="on"
            name="email"
            value={userData.email}
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
            value={userData.password}
            onChange={handleChange}
          /> 

          <button type="submit" className="auth__button button">
            Зарегистрироваться
          </button>

        </form>
      

        <p className="auth__subtitle">Уже зарегестрированы? 
          <Link to="/sign-in" className="auth__subtitle auth__subtitle_link"> Войти</Link>
        </p>
      </div>
      </>
   
    
  );
}
export default Register;