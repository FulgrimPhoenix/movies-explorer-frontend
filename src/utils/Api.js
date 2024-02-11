class Api {
  constructor({ apiUrl }) {
    this._url = apiUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  signup({name = "", email = "", password = ""}) {
    return this._request(this._url + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
  }

  signin({email = "", password = ""}) {
    return this._request(this._url + "signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  }
}

export const api = new Api({apiUrl : "https://api.mymovie.nomoredomainsmonster.ru/"});
