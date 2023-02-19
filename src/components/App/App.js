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
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [km, setKm] = useState("");

  const history = useHistory();

  //useEffect(() => {
  //if (token) {
  // api
  // .checkToken(token)
  // .then((res) => {
  // if (res) {
  //setFullName(res.fullName);
  //setIsLoggedIn(true);
  //history.push("/");
  //} else {
  // localStorage.removeItem("jwt");
  //  }
  // })
  //.catch((err) => console.log(err));
  //}
  // }, []);

  // useEffect(() => {
  //api
  // .getUserInfo(token)
  //.then((res) => {
  // setSelectedPerson(res);
  // setPersonLocation(res);
  //})
  // .catch(console.log);
  // }, [token]);

  //function handleUpdateUser({ fullName, birthDate, phone, profilePicture }) {
  // api
  // .setUserInfo({ fullName, birthDate, phone, profilePicture })
  // .then((data) => {
  // setCurrentUser(data);
  // })
  // .catch(console.log);
  //}

  //function handlePersonDelete(e) {
  //e.preventDefault();
  // api
  // .deletePerson(selectedPerson._id)
  //.then(() => {
  //setPersons((persons) =>
  //persons.filter(
  // (currentUser) => currentUser._id !== selectedPerson._id
  //)
  // );
  //})
  // .catch(console.log);
  // }

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
        if (res) {
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header fullName={fullName} />
        <Switch>
          <ProtectedRoute exact path="/">
            <Main />
          </ProtectedRoute>
          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogIn={onLogIn} getLocation={getLocation} />
          </Route>
          <Route></Route>
        </Switch>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
