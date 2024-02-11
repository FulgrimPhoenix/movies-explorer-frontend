class Api {
  constructor({ apiUrl }) {
    this._url = apiUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  signup(name, email, password) {
    return this._request(this._url + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
  }
}

export const api = new Api({apiUrl : "https://api.mymovie.nomoredomainsmonster.ru/"});
