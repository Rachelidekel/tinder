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

  updateUser({ id, location, fullName, birthDate, phone, profilePicture }) {
    return this._customFetch(`${this._baseUrl}/${id}/${location}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        fullName: fullName,
        birthDate: birthDate,
        phone: phone,
        profilePicture: profilePicture,
        location: location,
      }),
    });
  }

  getPersonsByDistance({ byDistance }) {
    return this._customFetch(`${this._baseUrl}/${byDistance}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
  }

  deletePerson(id) {
    return this._customFetch(`${this._baseUrl}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
  }
}

const api = new Api({
  baseUrl: "http://localhost:8080/api/persons",
});

export default api;
