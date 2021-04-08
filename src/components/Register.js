
import React, { useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import * as Auth from '../components/Auth.js';
import InfoTooltip from "./InfoTooltip.js";


function Register() {
  // const [email, setEmail]=React.useState("")
  // const [password, setPassword] =React.useState("")
  const [userData, setUserData] = React.useState({
    password:'',
    email:''
  })
  const [openInfoToolTip, setOpenInfoToolTip] = React.useState(false) // стэйт для отображения информационного соосбщения
  const [statusInfoToolTip,setStatusInfoToolTip] = React.useState("")//стейт с ошибкой
  const history = useHistory();

  const [user, setUser] = React.useState({}) //стейт для записи данных пришедших от сервера 

  const handleChange = (e)=>{
    const {name, value}=e.target
    setUserData({
      ...userData,
      [name]:value //записывается в стейт userData знаечния инпутов с атрибутом name // <input nama="email" >
    })
  }
  const closePopup = ()=>{
    setOpenInfoToolTip(false)
  }
  useEffect(()=>{
    if (user){ // если есть данные user, то  
     // localStorage.setItem('_id', user.data._id) 
      console.log("###user",user)
     // console.log('###localStorageId ',localStorage.getItem("_id"))
    }
  },[user])
   

    const handleSubmit = (e)=>{
      e.preventDefault();
      let {password, email } = userData;
      Auth
        .register(password,email)
        .then((response)=>{// в response объект {email:___, _id:____}
          // setUser(response);// записываем полученные днные с сервер в стейт
           setStatusInfoToolTip(response.status)//стейт для отображения infoToolTip-OK
           console.log("Register.js .then1 ##### response",response)
           console.log("Register.js .then1 ##### response.status",response.status)
           
           //console.log("Register.js .then1 #####response.json()", response.json())
           return response.json()
        })
        .then((user)=>{
          console.log(".then2 Register.js #####rez",user)
          setUser(user);// записываем полученные днные с сервер в стейт
          setOpenInfoToolTip(true)//стейт для отображения infoToolTip
        })
        .catch((err)=>{
          setOpenInfoToolTip(true);// стейт для отображения infoToolTip
          setStatusInfoToolTip(err)
          console.log("err в Register",err)
          
        })    
    }
    // console.log('Rgister.js .catch ###statusInfoToolTip', statusInfoToolTip)

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
            defaultValue={'artish@yandex.ru'}
            onChange={handleChange}
            
          />
          <input
            type="text"
            className="auth__field auth__field_type_password"
            id="auth__field_type_register-password"
            placeholder="Пароль"
            required
            minLength="3"
            maxLength="60"
            formNoValidate  
            autoComplete="on"
            name="password"
            defaultValue={"123"}
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
      <InfoTooltip status={statusInfoToolTip} isOpen={openInfoToolTip} onClose={closePopup}/>
      </>
   
    
  );
}
export default Register;