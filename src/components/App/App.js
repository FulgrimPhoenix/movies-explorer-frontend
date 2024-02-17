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
  const [isLoggedIn, setisLoggedIn] = React.useState(false);
  const [isMenuPopupOpen, setIsMenuPopupOpen] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [moviesList, setMoviesList] = React.useState([]);
  const [myMoviesList, setmyMoviesList] = React.useState([]);
  const [currentMoviesList, setCurrentMoviesList] = React.useState();
  const isProfilePage = useUrlPathName() === "/profile";
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentMoviesList(JSON.parse(localStorage.getItem("moviesList")));
    Promise.all([
      api.getMyUserInfo(),
      moviesApi.getMoviesList(),
      api.getMyMovieList(),
    ])
      .then(([myData, moviesList, myMoviesList]) => {
        setUserData(myData);
        setMoviesList(moviesList);
        setmyMoviesList(myMoviesList);
        setisLoggedIn(true);
      })
      .catch((err) => {
        setisLoggedIn(false);
        console.log(err);
      });
  }, []);

  function handleSetIsLoggedIn() {
    setisLoggedIn(!isLoggedIn);
  }

  function goBack() {
    navigate("../", { replace: false });
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
                      setCurrentMoviesList={setCurrentMoviesList}
                      name={"searchBar"}
                    />
                    <MovieCardList
                      // cardCellData={projectConstants.moviesData.staticData}
                      movieList={JSON.parse(localStorage.getItem("moviesList"))}
                      myMoviesList={myMoviesList}
                      setmyMoviesList={setmyMoviesList}
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
                      setCurrentMoviesList={setmyMoviesList}
                      name={"savedMoviesSearchBar"}
                    />
                    <MovieCardList
                      // cardCellData={projectConstants.moviesData.staticData}
                      movieList={myMoviesList}
                      myMoviesList={myMoviesList}
                      setmyMoviesList={setmyMoviesList}
                    />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    profileData={projectConstants.profileData}
                    handleSetIsLoggedIn={handleSetIsLoggedIn}
                    setUserData={setUserData}
                  />
                }
              />
            </Route>
          </Route>
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
