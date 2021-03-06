import "../index.css";

import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import Login from "../components/Login";
import Register from "../components/Register";


import ImagePopup from "../components/ImagePopup";
import api from "../utils/api";
import React, { useEffect } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext"; //импортировали контекст

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import * as Auth from '../components/Auth.js';
function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: "", about: "" }); //задали текущее значение состония объекту currentUser т.к. при первом монтирование попадается undefined
  const [cardsContext, setCards] = React.useState([]); //задали текущее значение состония переменной cardsContext

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    linkCard: {},
    nameCard: {},
  });

  const [logedIn, setLogedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState({email:""});
  const[statusSignIn, setStatusSignIn]= React.useState()
  const history = useHistory();

  useEffect(()=>{
    tokenCheck()
    if (logedIn) {
      history.push("/cards"); 
    } 
  }, [logedIn,history])


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(linkCard, nameCard) {
    setSelectedCard({
      isOpen: true,
      linkCard: { linkCard },
      nameCard: { nameCard },
    });
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ isOpen: false, linkCard: {}, nameCard: {} });
  }
  useEffect(() => {
    //получение данных пользователя
    api
      .getInfoProfile()
      .then((dataUser) => {
        setCurrentUser(dataUser); // записали в стейт currentUser принятое значение от сервера
      })
      .catch((err) => {
        console.log(err, "Ошибка при загрузке информации о профиле");
      });
  }, []);

  function handleUpdateUser({ name, about }) {
    api
      .addInfoProfile({ name, about })
      .then((dataUser) => {
        setCurrentUser(dataUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err, "Ошибка при отправке данных пользователя");
      });
  }
  function handleUpdateAvatar(data) {
    api
      .addInfoProfileAvatar(data)
      .then((dataUser) => {
        setCurrentUser(dataUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err, "Ошибка при отправке аватара");
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке

    if (isLiked) {
      api
        .deleteLike(card._id) // Отправляем запрос в API и получаем обновлённые данные карточки
        .then((newCard) => {
          setCards((state) => {
            return state.map((c) => (c._id === card._id ? newCard : c));
          });
        })
        .catch((err) => {
          console.log(err, "ошибка из api.deleteLike");
        });
    } else {
      api
        .putLike(card._id)
        .then((newCard) => {
          setCards((state) => {
            return state.map((c) => (c._id === card._id ? newCard : c));
          });
        })
        .catch((err) => {
          console.log(err, "ошибка из api.putLike");
        });
    }
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cardsContext.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err, "Ошибка при удалении карточки");
      });
  }

  useEffect(() => {
    // получение карточек

    api
      .getAllInitialCards()
      .then((dataCards) => {
        setCards(dataCards);
      })
      .catch((err) => {
        console.log(err, "Ошибка при загрузке карточек");
      });
  }, []);

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cardsContext]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err, "Ошибка при отправке новой карточки");
      });
  }
  function handleLogin(){
    setLogedIn(true);
  }
  const tokenCheck=()=>{
    if (localStorage.getItem('jwt')){
      let token = localStorage.getItem('jwt');
      
      Auth
        .getContent(token)
        .then((response)=>{
          return response.json()
        })
        .then((data)=>{
          if(data){
            setLogedIn(true)
            setUserEmail({email:data.data.email})
            
          }else{

          }
        })
        .catch((err)=>{console.log(err,"Ошибка при проверке токена")})
    }
  }
  function signOut(){//Выход
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setLogedIn(false)
    setStatusSignIn(false);
  }
  function signUp(){ //Регистрация
    history.push('/sign-up');
    setStatusSignIn(true);
  }
  function signIn(){//Авторизация
    history.push('/sign-in')
     setStatusSignIn(false)
  }
 
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="root">
          <div className="container">
            <Header
            userEmail={userEmail}
            statusLogedIn={logedIn}
            signOut={signOut}
            signUp={signUp}
            signIn={signIn}
            statusSignIn={statusSignIn}
            />

            <Switch>
              <ProtectedRoute 
                path="/cards"
                logedIn={logedIn}
                component={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cardsContext}
                onCardLike={handleCardLike} 
                onCardDelete={handleCardDelete}
              />

              <Route exact path="/sign-up">
                <Register signIn={signIn}/>
                
              </Route>

              <Route exact path="/sign-in">
                <Login onLogin={handleLogin}/>
                
              </Route>

              <Route exact path="/">
                {logedIn ? (<Redirect to="/cards" />) : (<Redirect to="/sign-in" />)}
              </Route>
            </Switch>

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />

            <Footer />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
