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

  signup({ name = "", email = "", password = "" }) {
    return fetch(this._url + "signup", {
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

  signin({ email = "", password = "" }) {
    return fetch(this._url + "signin", {
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

  signout() {
    return fetch(this._url + "signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      
    });
  }

  getMyUserInfo() {
    return this._request(this._url + "users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQxMjU4ZWJjZjE2NDkyNjNkYjdkYjkiLCJpYXQiOjE3MDgyNjczNDAsImV4cCI6MTcwODM1Mzc0MH0.XE2N5YAtdxo6ftDfuvUhdDghZP0-5Ot-V3eURBSHOjg"
      },
      credentials: "include",
    });
  }

  getMyMovieList() {
    return this._request(this._url + "movies", {
      method: "GET",
      headers: {
        "Set-Cookie": "SameSite=None; Secure"
      },
      credentials: "include",
    });
  }

  likeThisMovie(movieData){
    return this._request(this._url + "movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": "SameSite=None; Secure"
      },
      credentials: "include",
      body: JSON.stringify(movieData)
    });
  }
  unLikeThisMovie(movieId){
    return this._request(this._url + `movies/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": "SameSite=None; Secure"
      },
      credentials: "include"
    });
  }
  updateProfileInfo(newData){
    return this._request(this._url + `users/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": "SameSite=None; Secure"
      },
      credentials: "include",
      body: JSON.stringify(newData)
    })
  }
}

export const api = new Api({ apiUrl: "http://localhost:3001/" });
