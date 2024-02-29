import { useState } from "react";
import { api } from "../../utils/MainApi";
import "./MovieCard.css";
import { useUrlPathName } from "../../hooks/useUrlPathName";
import { projectConstants } from "../../utils/constants";

export function MovieCard({ cardData, myMoviesList, setmyMoviesList }) {
  const currentPath = useUrlPathName();
  const cellData = projectConstants.moviesData.staticData;
  const durationInHours = `${Math.floor(cardData.duration / 60) >= 1
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

  function dislikeMovie(movie) {
    setmyMoviesList(myMoviesList.filter(movieFromList => movieFromList.movieId !== movie.movieId));
  }

  function toggleLikeMovie() {
    if (isLiked) {
      api
        .unLikeThisMovie(
          myMoviesList.find((movie) => movie.movieId === cardData.id)._id
        )
        .then((res) => {
          dislikeMovie(res);
          setIsLiked(false)
        })
        .catch((err) => console.log(err));
    } else {
      api
        .likeThisMovie(currentCardData)
        .then((res) => {
          setmyMoviesList([...myMoviesList, res]);
          setIsLiked(true);
        })
        .catch((err) => console.log(err));
    }
  }


  return (
    <li className="card">
      <div className="card__img-container">
        <a
          className="card__link"
          href={cardData.trailerLink}
          target="blank"
        ></a>
        <div className="card__status-container">
          {currentPath === "/saved-movies" ? (
            <img
              onClick={() => {
                api.unLikeThisMovie(
                  myMoviesList.find((movie) => movie.movieId === cardData.movieId)._id
                ).then((res) => dislikeMovie(res))
              }}
              className="card__savedStatus"
              src={cellData.deleteIcon}
              alt="кнопка 'удалить'"
            />
          ) : isLiked ? (
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
            src={`${cardData.image.url
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
