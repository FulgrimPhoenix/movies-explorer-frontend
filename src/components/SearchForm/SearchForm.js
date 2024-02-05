import "./SearchForm.css";
import { useWindowSize } from "../../hooks/useWindowSize";

export function SearchForm({ formSearchUtils }) {
  const windowWidth = useWindowSize();

  return (
    <div className="search">
      {windowWidth > 600 ? (
        <form className="search__form">
          <img
            className="search__icon"
            src={formSearchUtils.search_icon}
            alt={formSearchUtils.alt_search_icon}
          />
          <input className="search__input" placeholder="Фильмы" />
          <button className="search__button" /*onSubmit={formUtils.onSubmit}*/>
            <p className="search__button-text">{formSearchUtils.button_text}</p>
          </button>
          <div className="search__container">
            <input
              type="checkbox"
              className="search__checkbox"
              name="shortfilm"
              id="shortfilm"
              value="no"
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
          <form className="search__form">
            <input className="search__input" placeholder="Фильмы" />
            <button
              className="search__button" /*onSubmit={formUtils.onSubmit}*/
            >
              <p className="search__button-text">
                {formSearchUtils.button_text}
              </p>
            </button>
          </form>
          <div className="search__container">
            <input
              type="checkbox"
              className="search__checkbox"
              name="shortfilm"
              id="shortfilm"
              value="no"
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
