import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import api from "../../utils/MainApi";
import { sucessfulLookup } from "../../utils/LocationApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ProtectedRoute from "../ProtectedRoute";
//import Preloader from "../Preloader/Preloader";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  //const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const [persons, setPersons] = useState("");
  const [personLocation, setPersonLocation] = useState("");
  const [selectedPerson, setSelectedPerson] = useState({
    fullName: "",
    birthDate: "",
    phone: "",
    profilePicture: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  const [km, setKm] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (token) {
      api
        .checkToken(token)
        .then((res) => {
          if (res) {
            setFullName(res.fullName);
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
        setSelectedPerson(res);
        setPersonLocation(res);
      })
      .catch(console.log);
  }, [token]);

  //useEffect(() =>{
  //location
  //.getCurrentPosition()
  //.then((res) =>{
  //setPersonLocation(res.user)
  //})
  //}, [])

  //function handleDeleteClick(card) {
  //setIsDeletePopupOpen(true);
  //setSelectedCard(card);
  //}

  function handleUpdateUser({ fullName, birthDate, phone, profilePicture }) {
    api
      .setUserInfo({ fullName, birthDate, phone, profilePicture }, token)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(console.log);
  }

  function handlePersonDelete(e) {
    e.preventDefault();
    //setIsLoading(true);
    api
      .deletePerson(selectedPerson._id, token)
      .then(() => {
        setPersons((persons) =>
          persons.filter(
            (currentUser) => currentUser._id !== selectedPerson._id
          )
        );
      })
      .catch(console.log);
  }

  function onRegister({ fullName, birthDate, phone, profilePicture }) {
    api
      .register({ fullName, birthDate, phone, profilePicture })
      .then((res) => {
        if (res._id) {
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onLogIn({ fullName }) {
    api
      .login({ fullName })
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
        console.log(err);
      });
  }

  const error = () => {
    console.log("Unable to retrieve your location");
  };

  function getLocation() {
    navigator.geolocation.getCurrentPosition(sucessfulLookup, error);
  }


  //function handleSearchSubmit(km) {
  // setIsSearchResultOpen(false);
  //setIsNothingFoundOpen(false);
  //arrayForHoldingPersons = [];
  // setIsPreloaderOpen(true);

  //setIsReceivingError(false);
  //setKm(km);

  // locationApi
  // .getPersons(km)
  // .then((persons) => {
  // setIsPreloaderOpen(false);
  //if (cards.totalResults !== 0) {
  // setIsSearchResultOpen(true);
  // setPersons(persons.info);
  //} else if (persons.totalResults === 0) {
  //setIsNothingFoundOpen(true);
  // }
  //})
  //.catch((err) => {
  // console.log(err);
  //setIsReceivingError(true);
  // });
  //}

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
            <Main onDelete={handlePersonDelete} />
          </ProtectedRoute>
          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogIn={onLogIn} getLocation={getLocation}/>
          </Route>
          <Route>
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
