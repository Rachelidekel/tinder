import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
//import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
//import EditProfilePopup from "./EditProfilePopup";
//import EditAvatarPopup from "./EditAvatarPopup";
//import AddPlacePopup from "./AddPlacePopup";
//import DeletePopupForm from "./DeletePopupForm";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  //const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  //const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  //const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
 
  //const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
 
  //const [isLoading, setIsLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  const history = useHistory();

  useEffect(() => {
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setFullName(res.user.fullName);
            setIsLoggedIn(true);
            history.push("/");
          } else {
            localStorage.removeItem("jwt");
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    api
      .getUserInfo(token)
      .then((res) => {
        setCurrentUser(res.user);
      })
      .catch(console.log);
  }, [token]);

 

  //function handleEditAvatarClick() {
    //setIsEditAvatarPopupOpen(true);
  //}

  //function handleEditProfileClick() {
    //setIsEditProfilePopupOpen(true);
  //}



 // function closeAllPopups() {
    //setIsAddPlacePopupOpen(false);
    //setIsEditAvatarPopupOpen(false);
    //setIsEditProfilePopupOpen(false);
    //setIsImagePreviewOpen(false);
    //setIsDeletePopupOpen(false);
    //setIsInfoTooltipOpen(false);
  //}

  //function handleDeleteClick(card) {
    //setIsDeletePopupOpen(true);
    //setSelectedCard(card);
  //}

  function handleUpdateUser({ fullName, phone, profilePicture }) {
    setIsLoading(true);
    api
      .setUserInfo({ fullName, phone, profilePicture }, token)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }

  //function handleUpdateAvatar(avatar) {
    //setIsLoading(true);
    //api
     // .setUserAvatar(avatar, token)
      //.then((data) => {
       // setCurrentUser(data);
        //closeAllPopups();
      //})
      //.catch(console.log)
     // .finally(() => setIsLoading(false));
 // }


  //function handleCardDelete(e) {
    //e.preventDefault();
    //setIsLoading(true);
   // api
      //.deleteCard(selectedCard._id, token)
      //.then(() => {
        //setCards((cards) =>
          //cards.filter((currentCard) => currentCard._id !== selectedCard._id)
        //);
        //closeAllPopups();
      //})

     // .catch(console.log)
     // .finally(() => setIsLoading(false));
  }


  function onRegister({ fullName, phone, profilePicture }) {
    auth
      .register({fullName, phone, profilePicture})
      .then((res) => {
        if (res._id) {
          history.push("/signin");
        } 
      })
      .catch((err) => {
       console.log(err)
      });
  }



  function onLogIn( fullName ) {
    auth
      .login(fullName)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setToken(res.token);
          setIsLoggedIn(true);
          setFullName(fullName);
          history.push("/");
          return res;
        } 
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function onLogOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header fullName={fullName} onLogOut={onLogOut} />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={isLoggedIn}>
            <Main
              //cards={cards}
              //onEditProfileClick={handleEditProfileClick}
              //onAddPlaceClick={handleAddPlaceClick}
              //onEditAvatarClick={handleEditAvatarClick}
              //onCardClick={handleCardClick}
              //onDeleteClick={handleDeleteClick}
              //onCardLike={handleCardLike}
            />
          </ProtectedRoute>
          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogIn={onLogIn} />
          </Route>
          <Route>
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Footer /> 
      </div>
    </CurrentUserContext.Provider>
  );


export default App;
