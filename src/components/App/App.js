import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "../../vendor/fonts/fonts.css";
import "../../vendor/normalize.css";
import "./App.css";
import React, { useEffect } from "react";

import { Header } from "../Header/Header";
import { Movies } from "../Movies/Movies.js";
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

function App() {
  const [email, setEmail] = React.useState("");
  const [logStatus, setLogStatus] = React.useState(true);
  const [likedMovies, setLikedMovies] = React.useState([]);
  const [isMenuPopupOpen, setIsMenuPopupOpen] = React.useState(false);
  const isProfilePage = useUrlPathName() === "/profile";

  const navigate =useNavigate();

  function logOut(){
    setLogStatus(false);
    navigate("/", { replace: true });
  }

  function goBack(){
    navigate("../", {replace: false})
  }

  function handleTogglePopup(){
    setIsMenuPopupOpen(!isMenuPopupOpen);
  }

  function changeEmail(e) {
    setEmail(e.target.value);
    console.log(email);
  }

  return (
    <CurrentUserContext.Provider
      value={{ profileName: "Dick", profileEmail: "test@mail.ru" }}
    >
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header togglePopup={handleTogglePopup} headerData={projectConstants.headerData} isLoggedIn={logStatus} />
                <Page />
                {isProfilePage ? "" : <Footer footerData={projectConstants.footerData} />}
              </>
            }
          >
            <Route
              index
              element={<Main projectConstants={projectConstants} />}
            />
            <Route
              path="movies"
              element={
                <>
                  <SearchForm
                    formSearchUtils={projectConstants.formSearchUtils}
                  />
                  <MovieCardList
                    cardCellData={projectConstants.moviesData.staticData}
                    movieList={projectConstants.moviesData.movieList}
                  />
                </>
              }
            />
            <Route
              path="saved-movies"
              element={
                <SearchForm
                  formSearchUtils={projectConstants.formSearchUtils}
                />
              }
            />
            <Route
              path="/profile"
              element={<Profile profileData={projectConstants.profileData} logOut={logOut} />}
            />
          </Route>
          <Route
            path="/signin"
            element={<Login loginFormData={projectConstants.loginFormData} />}
          ></Route>
          <Route
            path="/signup"
            element={
              <Register registerFormData={projectConstants.registerFormData} />
            }
          ></Route>
            <Route path="*" element={<NotFoundPage goBack={goBack} notFoundPageData={projectConstants.notFoundPageData} />}/>
        </Routes>
        <MenuPopup togglePopup={handleTogglePopup} popupStatus={isMenuPopupOpen} popupData={projectConstants.popupData}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
