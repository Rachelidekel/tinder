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

  login = ({ fullName, birthDate, phone, profilePicture }) => {
    return this._customFetch(`${this._baseUrl}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, birthDate, phone, profilePicture }),
    });
  };

  //createUser(data, token) {
  //return this._customFetch(`${this._baseUrl}/`, {
  // headers: {
  //"Content-Type": "application/json",
  // Authoriztion: `Bearer ${token}`,
  //},
  // method: "POST",
  //body: JSON.stringify({
  // birthDate: data.birthDate,
  //fullName: data.fullName,
  //location: data.location,
  //phone: data.phone,
  // profilePicture: data.profilePicture,
  //}),
  //});
  //}

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
