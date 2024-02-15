import React, { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import "./MovieCardList.css";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useUrlPathName } from "../../hooks/useUrlPathName";

export function MovieCardList({ cardCellData, movieList }) {
  const currentWidth = useWindowSize();
  const [cardListLength, setCardListLength] = useState(() => {
    if (currentWidth > 1079) {
      if (movieList.length < 12) {
        return movieList.length;
      } else {
        return 12;
      }
    } else if (currentWidth > 650) {
      if (movieList.length < 8) {
        return movieList.length;
      } else {
        return 8;
      }
    } else {
      if (movieList.length < 5) {
        return movieList.length;
      } else {
        return 5;
      }
    }
  });
  const [searchResultText, setSearchResultText] = useState("Ничего не найдено");
  const [counderOfAdditionalCards, setCounderOfAdditionalCards] = useState(3);
  const findedCardList = [];
  const currentPath = useUrlPathName();

  const [cardList, setCardList] = useState(
    setPageCardList(movieList, cardListLength)
  );

  useEffect(() => {
    setCardList(movieList);
  }, []);

  useEffect(() => {
    setCardList(movieList);
    setListSettings(currentWidth)
  }, [movieList]);

  useEffect(() => {
    setCardList(setPageCardList(movieList, cardListLength));
  }, [cardListLength]);

  useEffect(() => {
    setListSettings(currentWidth);
  }, [currentWidth]);

  function setPageCardList(cardPull, listLength) {
    let result = [];
    for (let i = 0; i < listLength; i++) {
      result[i] = cardPull[i];
    }
    return result;
  }

  function setListSettings(screenWidth) {
    if (screenWidth > 1079) {
      if (movieList.length < 12) {
        setCardListLength(movieList.length);
        setCounderOfAdditionalCards(3);
      } else {
        setCardListLength(12);
        setCounderOfAdditionalCards(3);
        return 12;
      }
    } else if (screenWidth > 650) {
      if (movieList.length < 8) {
        setCardListLength(movieList.length);
        setCounderOfAdditionalCards(2);
      } else {
        setCardListLength(8);
        setCounderOfAdditionalCards(2);
        return 8;
      }
    } else {
      if (movieList.length < 5) {
        setCardListLength(movieList.length);
        setCounderOfAdditionalCards(2);
      } else {
        setCardListLength(5);
        setCounderOfAdditionalCards(2);
        return 5;
      }
    }
  }

  function showMoreCards() {
    if (cardListLength + counderOfAdditionalCards > movieList.length) {
      return setCardListLength(movieList.length);
    }
    setCardListLength(cardListLength + counderOfAdditionalCards);
  }

  console.log(cardList);

  return (
    <div className="movie-card-list">
      {cardList !== 0 && cardList !== null ? (
        <>
          <ul className="movie-card-list__grid">
            {cardList.map((card) => {
              return (
                <MovieCard
                  // key={card.nameEN}
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
        </>
      ) : (
        <h2 className="movie-card-list__search-placeholder">
          {searchResultText}
        </h2>
      )}
    </div>
  );
}
