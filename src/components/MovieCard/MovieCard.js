import { useState } from "react";
import { api } from "../../utils/MainApi";
import "./MovieCard.css";
import { useUrlPathName } from "../../hooks/useUrlPathName";
import { projectConstants } from "../../utils/constants";

export function MovieCard({
  cardData,
  myMoviesList,
  setmyMoviesList,
}) {
  const currentPath = useUrlPathName();
  const cellData = projectConstants.moviesData.staticData
  const durationInHours = `${
    Math.floor(cardData.duration / 60) >= 1
      ? `${Math.floor(cardData.duration / 60)}ч`
      : ""
  } ${cardData.duration % 60 === 0 ? "" : `${cardData.duration % 60}м`}`;
  const currentCardData = {
    country: cardData.country,
    director: cardData.director,
    duration: cardData.duration,
    year: cardData.year,
    description: cardData.description,
    image: `https://api.nomoreparties.co${cardData.image.url}`,
    trailerLink: cardData.trailerLink,
    nameRU: cardData.nameRU,
    nameEN: cardData.nameEN,
    thumbnail: `https://api.nomoreparties.co${cardData.image.url}`,
    movieId: cardData.id,
  };

  const [isLiked, setIsLiked] = useState(checkForLike(myMoviesList));

  function checkForLike(currentMovieList) {
    return currentMovieList.some((movie) => {
      return movie.movieId === cardData.id;
    });
  }

  function toggleLikeMovie() {
    if (currentPath === "/movies") {
      if (isLiked) {
        console.log(myMoviesList);
        api
          .unLikeThisMovie(
            myMoviesList.find((movie) => movie.movieId === cardData.id)._id
          )
          .then(() => {
            api.getMyMovieList().then((res) => {
              setmyMoviesList(res);
              setIsLiked(checkForLike(res));
              setIsLiked(false)
            });
          })
          .catch((err) => console.log(err));
      } else {
        api
          .likeThisMovie(currentCardData)
          .then(() => {
            api
              .getMyMovieList()
              .then((res) => {
                console.log(321, res);
                setmyMoviesList(res);
                setIsLiked(checkForLike(res));
                setIsLiked(true)
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }
    } else if (currentPath === "/saved-movies") {
      api
        .unLikeThisMovie(cardData._id)
        .then(() => {
          api.getMyMovieList().then((res) => {
            console.log(res);
            setmyMoviesList(res);
            setIsLiked(checkForLike(res));
            setIsLiked(false)
          });
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <li className="card">
      <div className="card__img-container">
        <a className="card__link" href={cardData.trailerLink} target="blank"></a>
        <div className="card__status-container">
          {isLiked || currentPath === "/saved-movies"? (
            <img
              onClick={toggleLikeMovie}
              className="card__savedStatus"
              src={cellData.savedImg}
              alt="кнопка 'сохранено'"
            />
          ) : (
            <button className="card__save-button" onClick={toggleLikeMovie}>
              {cellData.saveButtonText}
            </button>
          )}
        </div>
        <picture>
          <img
            className="card__img"
            src={`${
              cardData.image.url
                ? `https://api.nomoreparties.co${cardData.image.url}`
                : `${cardData.image}`
            }`}
            alt={cardData.title}
          />
        </picture>
      </div>
      <div className="card__description">
        <p className="card__title">{cardData.nameRU}</p>
        <div className="card__duration-container">
          <p className="card__duration-time">{durationInHours}</p>
        </div>
      </div>
    </li>
  );
}
