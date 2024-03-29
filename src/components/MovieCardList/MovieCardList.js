import React, { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import "./MovieCardList.css";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useUrlPathName } from "../../hooks/useUrlPathName";

export function MovieCardList({
  moviesList,
  myMoviesList,
  setmyMoviesList,
  searchErrorResultText
}) {
  const currentWidth = useWindowSize();
  const currentPath = useUrlPathName();

  const [cardListLength, setCardListLength] = useState(() => {
    if (currentWidth > 1077) {
      return 12
    } else if (currentWidth > 767) {
      return 8
    } else {
      return 5
    }
  })

  useEffect(() => {
    setCardListLength(() => {
      if (currentWidth > 1077) {
        return 12
      } else if (currentWidth > 767) {
        return 8
      } else {
        return 5
      }
    })
  }, [currentPath]);

  function showCards(cardList, cardListLength) {
    const currentList = cardList.slice(0, cardListLength)
    return currentList.map((movie) =>
      <MovieCard
        key={movie.nameEN}
        myMoviesList={myMoviesList}
        setmyMoviesList={setmyMoviesList}
        cardData={movie}
      />
    )
  }

  return (
    <div className="movie-card-list">
      {moviesList && moviesList.length !== 0 ? (
        <>
          <ul className="movie-card-list__grid">
            {currentPath === "/saved-movies" ? moviesList.map((movie) =>
              <MovieCard
                key={movie.nameEN}
                myMoviesList={myMoviesList}
                setmyMoviesList={setmyMoviesList}
                cardData={movie}
              />
            ) : showCards(moviesList, cardListLength)}
          </ul>
          <button
            className={`${cardListLength >= moviesList.length ||
              currentPath === "/saved-movies"
              ? "movie-card-list__button-more_disabled"
              : "movie-card-list__button-more"
              }`}
            onClick={() => setCardListLength(currentWidth > 1077 ? cardListLength + 3 : cardListLength + 2)}
          >
            Ещё
          </button>
        </>
      ) : (
        <h2 className="movie-card-list__search-placeholder">
          {searchErrorResultText}
        </h2>
      )}
    </div>
  );
}
