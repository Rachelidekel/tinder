class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _customFetch = (url, headers) => {
    return fetch(url, headers).then((res) =>
      res.ok ? res.json() : Promise.reject(res.statusText)
    );
  };

   register = ({fullName, birthDate, phone, profilePicture}) => {
    return this._customFetch(`${this._baseUrl}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, birthDate, phone, profilePicture }),
    });
  };

  login = ({fullName}) => {
    return this._customFetch(`${this._baseUrl}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName }),
    });
  };

  checkToken = (token) => {
    return this._customFetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };


  getUserInfo(token) {
    return this._customFetch(`${this._baseUrl}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  setUserInfo({ fullName, phone, profilePicture }, token) {
    return this._customFetch(`${this._baseUrl}/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        fullName: fullName,
        phone: phone,
        profilePicture: profilePicture,
      }),
    });
  }

  createUser(data, token) {
    return this._customFetch(`${this._baseUrl}/`, {
      headers: {
        "Content-Type": "application/json",
        Authoriztion: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        birthDate: data.birthDate,
        fullName: data.fullName,
        location: data.location,
        phone: data.phone,
        profilePicture: data.profilePicture
      }),
    });
  }

  getPersonsByDistance({byDistance}) {
    return this._customFetch(`${this._baseUrl}/ ${byDistance}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  }

  deletePerson(personId, token) {
    return this._customFetch(`${this._baseUrl}/${personId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    });
  }

 

  //setUserAvatar({ profilePicture }, token) {
    //return this._customFetch(`${this._baseUrl}/users/me/profilePicture`, {
      //headers: {
        //"Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      //},
      //method: "PATCH",
     // body: JSON.stringify({ profilePicture }),
   // });
 // }
}

const api = new Api({
baseUrl: "http://localhost:8080/api/persons",
  //baseUrl: "https://www.gps-coordinates.net/my-location",
});

export default api;
