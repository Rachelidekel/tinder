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

  register = ({ fullName, birthDate, phone, profilePicture }) => {
    return this._customFetch(`${this._baseUrl}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, birthDate, phone, profilePicture }),
    });
  };

  login = ({ fullName }) => {
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

  setUserInfo({ fullName, birthDate, phone, profilePicture }, token) {
    return this._customFetch(`${this._baseUrl}/id/location`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        fullName: fullName,
        birthDate: birthDate,
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
        profilePicture: data.profilePicture,
      }),
    });
  }

  getPersonsByDistance({ byDistance }) {
    return this._customFetch(`${this._baseUrl}/ ${byDistance}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  }

  deletePerson(id, token) {
    return this._customFetch(`${this._baseUrl}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    });
  }
}

const api = new Api({
  baseUrl: "http://localhost:8080/api/persons",
});

export default api;
