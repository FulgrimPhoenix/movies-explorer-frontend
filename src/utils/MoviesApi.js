class MoviesApi {
  constructor({url}) {
    this._url = url;
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

  getMoviesList() {
    return this._request(this._url, {
      method: "GET",
    });
  }
}

export const moviesApi = new MoviesApi({url: "https://api.nomoreparties.co/beatfilm-movies"})
