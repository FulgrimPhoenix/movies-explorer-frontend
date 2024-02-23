import { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import "./Profile.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ProfileInput } from "../ProfileInput/ProfileInput";
import { FormButton } from "../FormButton/FormButton";
import { api } from "../../utils/MainApi";
import { useNavigate } from "react-router-dom";

export function Profile({
  profileData,
  handleSetIsLoggedIn,
  setUserData,
  resetSearch,
  signOut
}) {
  const { values, onChange, setValues } = useForm({});
  const [isValid, setIsValid] = useState({
    name: false,
    email: true,
  });
  const [isEditMode, setMode] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(true);
  const [isInputActive, setIsInputActive] = useState(true);
  const [reqStatus, setReqStatus] = useState(true);
  const [reqStatusText, setReqStatusText] = useState("");
  const userData = useContext(CurrentUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsValid({
      name: false,
      email: true,
    });
    setValues({ name: userData.name, email: userData.email });
    setIsButtonActive(false);
  }, []);

  useEffect(() => {
    if (Object.values(isValid).every((item) => item)) {
      if (
        values["name"] === userData.name &&
        values["email"] === userData.email
      ) {
        setIsButtonActive(false);
      } else {
        setIsButtonActive(true);
      }
    } else {
      setIsButtonActive(false);
    }
  }, [isValid, Object.values(values)]);

  function signout() {
    api
      .signout()
      .then(() => {
        handleSetIsLoggedIn();
        signOut();
        resetSearch();
        localStorage.clear();
        navigate("/", { replace: true });
      })
      .catch((err) => console.log(err));
  }

  function handleModeSubmit(field) {
    setMode(!isEditMode);
  }

  function validateForm(name, value) {
    setIsValid({ ...isValid, [name]: value });
  }

  function onInputChange(e){
    onChange(e);
    setReqStatusText("");
  }

  function updateMyInfo(e, newValue) {
    setIsButtonActive(false);
    e.preventDefault();
    api
      .updateProfileInfo(newValue)
      .then((res) => {
        setUserData(res);
        setIsButtonActive(true);
        setReqStatusText("Данные успешно обновлены");
        setReqStatus(true)
      })
      .catch((err) => {
        console.log(err);
        setReqStatusText(`Произошла ошибкаЖ ${err.message}`);
        setReqStatus(false)
        setIsButtonActive(true);
      });
  }

  return (
    <section className="profile">
      <h1 className="profile__title">{profileData.title(userData.name)}</h1>
      <form className="profile__form" onSubmit={(e) => updateMyInfo(e, values)}>
        <ProfileInput
          name={"name"}
          inputTitle={"Имя"}
          value={values["name"]}
          profileData={userData.name}
          onChange={onInputChange}
          validateForm={validateForm}
          isEditMode={isEditMode}
          regax={/[^a-zа-я\sё-]/gi}
          advancedValidation={true}
          setIsButtonActive={setIsButtonActive}
        />
        <ProfileInput
          name={"email"}
          inputTitle={"Почта"}
          value={values["email"]}
          profileData={userData.email}
          onChange={onInputChange}
          validateForm={validateForm}
          isEditMode={isEditMode}
          regax={
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
          }
          advancedValidation={true}
          setIsButtonActive={setIsButtonActive}
        />

        {isEditMode ? (
          <>
            <span
              className={`profile__req-status ${
                reqStatus
                  ? "profile__req-status_sucсess"
                  : "profile__req-status_fail"
              }`}
            >
              {reqStatusText}
            </span>
            <FormButton
              buttonStyle="profile__save-button"
              isButtonActive={isButtonActive}
              onClick={handleModeSubmit}
              buttonText="Сохранить"
            />
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => handleModeSubmit()}
              className="profile__edit-button"
            >
              Редактировать
            </button>
            <button
              type="button"
              onClick={signout}
              className="profile__logout-button"
            >
              Выйти из аккаунта
            </button>
          </>
        )}
      </form>
    </section>
  );
}
