import "./SearchForm.css";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import { useUrlPathName } from "../../hooks/useUrlPathName";
import { projectConstants } from "../../utils/constants";

export function SearchForm({
  formSearchUtils,
  moviesList,
  setCurrentMoviesList,
  name,
  setSearchErrorResultText,
}) {
  const windowWidth = useWindowSize();
  const currentPath = useUrlPathName();
  const { values, onChange } = useForm({
    searchBar: localStorage.getItem("searchRequest") || "",
    savedMoviesSearchBar: "",
  });
  const [isShortMovies, setIsShortMovies] = useState(
    name === "searchBar"
      ? JSON.parse(localStorage.getItem("checkbox")) || ""
      : false
  );

  function searchMovies(isShortMovies, list, searchRequest) {
    const searchResult = list.filter((movie) => {
      const nameRU = movie.nameRU.toLowerCase();
      const nameEN = movie.nameEN.toLowerCase();
      const request = searchRequest.toLowerCase();
      if (isShortMovies) {
        return (
          (nameRU.includes(request) || nameEN.includes(request)) &&
          movie.duration < 50
        );
      } else {
        return nameRU.includes(request) || nameEN.includes(request);
      }
    });
    if (currentPath === "/movies") {
      localStorage.setItem("checkbox", JSON.stringify(isShortMovies));
      localStorage.setItem("searchRequest", `${searchRequest}`);
      localStorage.setItem("moviesList", JSON.stringify(searchResult));
      setCurrentMoviesList(searchResult);
      searchResult.length === 0
        ? setSearchErrorResultText(projectConstants.messages.noOneMoviesFinded)
        : setSearchErrorResultText("");
    } else {
      setCurrentMoviesList(searchResult);
      searchResult.length === 0
        ? setSearchErrorResultText(projectConstants.messages.noOneMoviesFinded)
        : setSearchErrorResultText("");
    }
  }

  return (
    <div className="search">
      {windowWidth > 600 ? (
        <form
          className="search__form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          noValidate
        >
          <img
            className="search__icon"
            src={formSearchUtils.search_icon}
            alt={formSearchUtils.alt_search_icon}
          />
          <input
            className="search__input"
            name={name}
            value={values[name] || ""}
            onChange={(e) => {
              onChange(e);
            }}
            placeholder="Фильмы"
            required
          />
          <button
            className="search__button"
            onClick={() =>
              searchMovies(
                isShortMovies,
                moviesList,
                currentPath === "/movies"
                  ? values["searchBar"]
                  : values["savedMoviesSearchBar"]
              )
            }
          >
            {formSearchUtils.button_text}
          </button>
          <div className="search__container">
            <input
              type="checkbox"
              className="search__checkbox"
              name="shortfilm"
              id="shortfilm"
              checked={isShortMovies}
              onChange={(e) => {
                setIsShortMovies(e.target.checked);
                searchMovies(
                  e.target.checked,
                  moviesList,
                  currentPath === "/movies"
                    ? values["searchBar"]
                    : values["savedMoviesSearchBar"]
                );
              }}
            />
            <label
              htmlFor="shortfilm"
              className="search__checkbox-picture"
            ></label>
          </div>
          <p className="search__checkbox-title">
            {formSearchUtils.checkbox_title}
          </p>
        </form>
      ) : (
        <>
          <form
            className="search__form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            noValidate
          >
            <input
              className="search__input"
              name={name}
              value={values[name] || ""}
              onChange={onChange}
              placeholder="Фильмы"
            />
            <button
              className="search__button"
              onClick={() =>
                searchMovies(
                  isShortMovies,
                  moviesList,
                  currentPath === "/movies"
                    ? values["searchBar"]
                    : values["savedMoviesSearchBar"]
                )
              }
            >
              {formSearchUtils.button_text}
            </button>
          </form>
          <div className="search__container">
            <input
              type="checkbox"
              className="search__checkbox"
              name="shortfilm"
              id="shortfilm"
              value="no"
              onChange={(e) => {
                setIsShortMovies(e.target.checked);
                searchMovies(
                  e.target.checked,
                  moviesList,
                  currentPath === "/movies"
                    ? values["searchBar"]
                    : values["savedMoviesSearchBar"]
                );
              }}
            />
            <label
              htmlFor="shortfilm"
              className="search__checkbox-picture"
            ></label>
            <p className="search__checkbox-title">
              {formSearchUtils.checkbox_title}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
