import { Route, Routes, useNavigate } from "react-router-dom";
import "../../vendor/fonts/fonts.css";
import "../../vendor/normalize.css";
import "./App.css";
import React, { useEffect } from "react";

import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { projectConstants } from "../../utils/constants";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../SearchForm/SearchForm.js";
import { MovieCardList } from "../MovieCardList/MovieCardList.js";
import { Register } from "../Register/Register";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import { Profile } from "../Profile/Profile.js";
import { Login } from "../Login/Login.js";
import { Page } from "../Page/Page.js";
import { MenuPopup } from "../MenuPopup/MenuPopup.js";
import { useUrlPathName } from "../../hooks/useUrlPathName.js";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage.js";
import { api } from "../../utils/MainApi.js";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute.js";
import { moviesApi } from "../../utils/MoviesApi.js";

function App() {
  const [isLoggedIn, setisLoggedIn] = React.useState(
    JSON.parse(localStorage.getItem("isLoggedIn"))
  );
  const [isMenuPopupOpen, setIsMenuPopupOpen] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [moviesList, setMoviesList] = React.useState([]);
  const [myMoviesList, setmyMoviesList] = React.useState([]);
  const [searchResultAmongAllMovies, setSearchResultAmongAllMovies] =
    React.useState(JSON.parse(localStorage.getItem("moviesList")) || "");
  const [searchResultAmongMyMovies, setSearchResultAmongMyMovies] =
    React.useState([]);
  const [searchErrorResultText, setSearchErrorResultText] =
    React.useState("Вы не сохранили ни одного фильма");
  const isProfilePage = useUrlPathName() === "/profile";
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      api.getMyUserInfo(),
      moviesApi.getMoviesList(),
      api.getMyMovieList(),
    ])
      .then(([myData, moviesList, myMoviesList]) => {
        console.log(123);
        setUserData(myData);
        setMoviesList(moviesList);
        setSearchResultAmongAllMovies(
          JSON.parse(localStorage.getItem("moviesList")) || moviesList
        );
        setmyMoviesList(myMoviesList);
        console.log(myMoviesList);
        setSearchResultAmongMyMovies(myMoviesList);
        setisLoggedIn(true);
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
      })
      .catch((err) => {
        setSearchErrorResultText(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
        setisLoggedIn(false);
        localStorage.setItem("isLoggedIn", JSON.stringify(false));
        console.log(err);
      });
  }, [isLoggedIn]);

  function handleSetIsLoggedIn() {
    setisLoggedIn(!isLoggedIn);
  }

  function signOut() {
    setisLoggedIn(false);
  }

  function resetSearch() {
    setSearchResultAmongAllMovies(moviesList);
    setSearchResultAmongMyMovies(myMoviesList);
  }

  function updateMyMoviesList(newList) {
    setmyMoviesList(newList)
    setSearchResultAmongMyMovies(newList);
    console.log(newList);
  }

  function goBack() {
    navigate(-1, { replace: false });
  }

  function handleTogglePopup() {
    setIsMenuPopupOpen(!isMenuPopupOpen);
  }

  return (
    <CurrentUserContext.Provider value={userData}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  togglePopup={handleTogglePopup}
                  headerData={projectConstants.headerData}
                  isLoggedIn={isLoggedIn}
                />
                <Page />
                {isProfilePage ? (
                  ""
                ) : (
                  <Footer footerData={projectConstants.footerData} />
                )}
              </>
            }
          >
            <Route
              index
              element={<Main projectConstants={projectConstants} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn} redirectPath="/" />
              }
            >
              <Route
                path="movies"
                element={
                  <>
                    <SearchForm
                      formSearchUtils={projectConstants.formSearchUtils}
                      moviesList={moviesList}
                      setCurrentMoviesList={setSearchResultAmongAllMovies}
                      name={"searchBar"}
                      setSearchErrorResultText={setSearchErrorResultText}
                    />
                    <MovieCardList
                      moviesList={searchResultAmongAllMovies}
                      myMoviesList={myMoviesList}
                      setmyMoviesList={updateMyMoviesList}
                      searchErrorResultText={searchErrorResultText}
                    />
                  </>
                }
              />
              <Route
                path="saved-movies"
                element={
                  <>
                    <SearchForm
                      formSearchUtils={projectConstants.formSearchUtils}
                      moviesList={myMoviesList}
                      setCurrentMoviesList={setSearchResultAmongMyMovies}
                      name={"savedMoviesSearchBar"}
                      setSearchErrorResultText={setSearchErrorResultText}
                    />
                    <MovieCardList
                      moviesList={searchResultAmongMyMovies}
                      myMoviesList={searchResultAmongMyMovies}
                      setmyMoviesList={updateMyMoviesList}
                      searchErrorResultText={searchErrorResultText}
                    />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    signOut={signOut}
                    profileData={projectConstants.profileData}
                    handleSetIsLoggedIn={handleSetIsLoggedIn}
                    setUserData={setUserData}
                    resetSearch={resetSearch}
                  />
                }
              />
            </Route>
          </Route>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={!isLoggedIn} redirectPath="/" />
            }
          >
            <Route
              path="/signin"
              element={
                <Login
                  loginFormData={projectConstants.loginFormData}
                  handleSetIsLoggedIn={handleSetIsLoggedIn}
                />
              }
            ></Route>
            <Route
              path="/signup"
              element={
                <Register
                  registerFormData={projectConstants.registerFormData}
                  handleSetIsLoggedIn={handleSetIsLoggedIn}
                />
              }
            ></Route>
          </Route>
          <Route
            path="*"
            element={
              <NotFoundPage
                goBack={goBack}
                notFoundPageData={projectConstants.notFoundPageData}
              />
            }
          />
        </Routes>
        <MenuPopup
          togglePopup={handleTogglePopup}
          popupStatus={isMenuPopupOpen}
          popupData={projectConstants.popupData}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
