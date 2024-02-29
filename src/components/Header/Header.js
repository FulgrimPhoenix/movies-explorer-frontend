import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { useUrlPathName } from "../../hooks/useUrlPathName";
import { useWindowSize } from "../../hooks/useWindowSize";

export function Header({ togglePopup, headerData, isLoggedIn }) {
  const setActive = ({ isActive }, baseStyle) =>
    isActive ? `${baseStyle} header__link_active` : `${baseStyle}`;

  const isMainPage = useUrlPathName() === "/";
  const windowWidth = useWindowSize();

  return (
    <header className={`header ${isMainPage ? "header_main-page-color" : ""}`}>
      <div className="header__container">
        <Link className="header__logo" to="/">
          <img src={headerData.logo} alt="логотип" />
        </Link>
        {windowWidth < 769 ? (
          isLoggedIn ? (
            <button onClick={togglePopup} className="header__menu-switcher">
              <img src={headerData.navBarIcon} alt="Кнопка меню навигации" />
            </button>
          ) : (
            <ul className="header__menu-list">
              <li className="header__menu-item">
                <Link className="header__link" to="signup">
                  {headerData.registerButton}
                </Link>
              </li>
              <li className="header__menu-item header__menu-item_dark-theme">
                <Link
                  className="header__link header__link_dark-theme"
                  to="signin"
                >
                  {headerData.signInButton}
                </Link>
              </li>
            </ul>
          )
        ) : (
          <div className="header__menu">
            <nav>
              <ul className="header__menu-list">
                {isLoggedIn ? (
                  <>
                    <li className="header__menu-nav-item">
                      <NavLink
                        className={({ isActive }) =>
                          setActive({ isActive }, "header__menu-nav-link")
                        }
                        to="/movies"
                      >
                        {headerData.moviesButton}
                      </NavLink>
                    </li>
                    <li className="header__menu-nav-item">
                      <NavLink
                        className={({ isActive }) =>
                          setActive({ isActive }, "header__menu-nav-link")
                        }
                        to="saved-movies"
                      >
                        {headerData.savedMoviesButton}
                      </NavLink>
                    </li>
                    <li className="header__profile-cell">
                      <NavLink
                        className={({ isActive }) =>
                          setActive({ isActive }, "header__profile-cell-link")
                        }
                        to="profile"
                      >
                        {headerData.profileButton}
                      </NavLink>
                      <div
                        className={`header__accaunt-img-container ${isMainPage ? "" : "header__accaunt-img-container_lite"
                          }`}
                      >
                        <picture className="header__accaunt-img">
                          <img
                            src={
                              isMainPage
                                ? headerData.accauntImgPink
                                : headerData.accauntImg
                            }
                            alt="логотип"
                          />
                        </picture>
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="header__menu-item">
                      <Link className="header__link" to="signup">
                        {headerData.registerButton}
                      </Link>
                    </li>
                    <li className="header__menu-item header__menu-item_dark-theme">
                      <Link
                        className="header__link header__link_dark-theme"
                        to="signin"
                      >
                        {headerData.signInButton}
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
