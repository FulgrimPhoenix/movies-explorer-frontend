import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useUrlPathName } from "../../hooks/useUrlPathName";
import { useWindowSize } from "../../hooks/useWindowSize";

export function Header({ togglePopup, headerData, isLoggedIn }) {
  const setActive = ({ isActive }, baseStyle) =>
    isActive ? `${baseStyle} header__link_active` : `${baseStyle}`;

  const [isMenuOpen, setIsMenuOpen] = useState("false");

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const isMainPage = useUrlPathName() === "/";
  const windowWidth = useWindowSize();

  return (
    <header className={`header ${isMainPage ? "header_main-page-color" : ""}`}>
      <div className="header__container">
        <Link className="header__logo" to="/">
          <img src={headerData.logo} alt="logo" />
        </Link>
        {windowWidth < 769 ? (
          isLoggedIn ?
          <button onClick={togglePopup} className="header__menu-switcher">
            <img src={headerData.navBarIcon} alt="navIcon"/>
          </button>
          :
          <ul className="header__menu-list">
            <li className="header__menu-item">
              <Link className="header__link" to="signup">
                Регистрация
              </Link>
            </li>
            <li className="header__menu-item header__menu-item_dark-theme">
              <Link
                className="header__link header__link_dark-theme"
                to="signin"
              >
                Войти
              </Link>
            </li>
          </ul>
        ) : (
          <div className="header__menu">
            <nav>
              <ul className="header__menu-list">
                {isLoggedIn ? (
                  <>
                    <li className="header__menu-nav-item">
                      <NavLink
                        className={({ isActive }) =>
                          setActive({ isActive }, "header__nav-link")
                        }
                        to="/movies"
                      >
                        Фильмы
                      </NavLink>
                    </li>
                    <li className="header__menu-nav-item">
                      <NavLink
                        className={({ isActive }) =>
                          setActive({ isActive }, "header__nav-link")
                        }
                        to="saved-movies"
                      >
                        Сохраненные фильмы
                      </NavLink>
                    </li>
                    <li className="header__profile-cell">
                      <NavLink
                        className={({ isActive }) =>
                          setActive({ isActive }, "header__accaunt-nav-link")
                        }
                        to="profile"
                      >
                        Аккаунт
                      </NavLink>
                      <div
                        className={`header__accaunt-img-container ${
                          isMainPage ? "" : "header__accaunt-img-container_lite"
                        }`}
                      >
                        <picture className="header__accaunt-img">
                          <source
                            srcSet={
                              isMainPage
                                ? headerData.accauntImgPink
                                : headerData.accauntImg
                            }
                            media="(min-width: 600px)"
                            type="image/svg"
                          />
                          <img
                            src={
                              isMainPage
                                ? headerData.legacyAccauntImgPink
                                : headerData.legacyAccauntImg
                            }
                            alt="logo"
                          />
                        </picture>
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="header__menu-item">
                      <Link className="header__link" to="signup">
                        Регистрация
                      </Link>
                    </li>
                    <li className="header__menu-item header__menu-item_dark-theme">
                      <Link
                        className="header__link header__link_dark-theme"
                        to="signin"
                      >
                        Войти
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
