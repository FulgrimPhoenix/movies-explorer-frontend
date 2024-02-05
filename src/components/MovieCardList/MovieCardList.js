import React from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import "./MovieCardList.css";

export function MovieCardList({ cardCellData, movieList }) {
  const [cardListLength, setCardListLength] = React.useState(3);

  const [cardList, setCardList] = React.useState(() => {
    let result = [];
    for (let i = 0; i < cardListLength; i++) {
      result[i] = movieList[i];
    }
    return result;
  });

  React.useEffect(() => {
    setCardList(() => {
      let result = [];
      for (let i = 0; i < cardListLength; i++) {
        result[i] = movieList[i];
      }
      return result;
    });
  }, [cardListLength]);

  function showMoreCards() {
    setCardListLength(cardListLength + 3);
  }
  return (
    <section className="movie-card-list">
      <ul className="movie-card-list__grid">
        {cardList.map((card) => {
          return (
            <MovieCard
              key={card.title}
              cardData={card}
              cellData={cardCellData}
            />
          );
        })}
      </ul>
      <button
        className={`${
          cardListLength === movieList.length
            ? "movie-card-list__button-more_disabled"
            : "movie-card-list__button-more"
        }`}
        onClick={() => showMoreCards()}
      >
        Ещё
      </button>
    </section>
  );
}
