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

  
  getUserInfo(token) {
    return this._customFetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  setUserInfo({ fullName, phone, profilePicture }, token) {
    return this._customFetch(`${this._baseUrl}/users/me`, {
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
        locationLatitude: data.locationLatitude,
        locationLongitude: data.locationLongitude,
        phone: data.phone,
        profilePicture: data.profilePicture
      }),
    });
  }

  getPersonsByDistance(distance) {
    return this._customFetch(`${this._baseUrl}/` + distance, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  }

  deletePerson(personId, token) {
    return this._customFetch(`${this._baseUrl}/persons/${personId}`, {
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
  baseUrl: "http://localhost:8080",
});

export default api;
