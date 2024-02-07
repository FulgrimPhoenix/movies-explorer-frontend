import "./MenuPopup.css";
import { MenuLink } from "../MenuLink/MenuLink";

export function MenuPopup({ togglePopup, popupStatus, popupData }) {

  function closePopup(e) {
    const overlay = document.querySelector('.popup_opened');
    const navLink = document.querySelector('.popup__link-item')
    if (e.target === overlay) {
      return togglePopup()
    } else {
      if (e.target === navLink) {
        return togglePopup()
      }
      return
    }
  }

  return (
    <div onClick={(e) => closePopup(e)} className={`popup ${popupStatus ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button onClick={togglePopup} className="popup__exit-button">
          <img src={popupData.exitButton} alt="Кнопка закрытия" />
        </button>
        <nav className="popup__link-items">
          <MenuLink onClick={togglePopup} title={"Главная"} to={"/"} styleMode={"popup__link-item"} />
          <MenuLink onClick={togglePopup} title={"Фильмы"} to={"/movies"} styleMode={"popup__link-item"} />
          <MenuLink onClick={togglePopup} title={"Сохраненные фильмы"} to={"/saved-movies"} styleMode={"popup__link-item"} />
        </nav>
        <div className="popup__cell">
          <MenuLink onClick={togglePopup} title="Аккаунт" to={"/profile"} styleMode={"popup__cell-link"} />
          <div className="popup__cell-image-container">
            <img className="popup__cell-image" src={popupData.accauntImg} alt="картинка пользователя" />
          </div>
        </div>
      </div>
    </div>
  );
}
