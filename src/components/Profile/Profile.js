import { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import "./Profile.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ProfileInput } from "../ProfileInput/ProfileInput";
import { FormButton } from "../FormButton/FormButton";
import { api } from "../../utils/MainApi";
import { useNavigate } from "react-router-dom";
import { projectConstants } from "../../utils/constants";

export function Profile({
  profileData,
  handleSetIsLoggedIn,
  setUserData,
  resetSearch,
  signOut
}) {
  const userData = useContext(CurrentUserContext);
  const { values, onChange, setValues } = useForm({email: userData.email, name: userData.name});
  const [isValid, setIsValid] = useState({
    name: false,
    email: true,
  });
  const [isEditMode, setMode] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(true);
  const [isFormActive, setIsFormActive] = useState(true);
  const [reqStatus, setReqStatus] = useState(true);
  const [reqStatusText, setReqStatusText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsValid({
      name: true,
      email: true,
    });
    setIsButtonActive(false);
  }, []);

  useEffect(() => {
    if (Object.values(isValid).every((item) => item)) {
      if (
        values["name"] !== userData.name ||
        values["email"] !== userData.email
      ) {
        setIsButtonActive(true);
      } else {
        setIsButtonActive(false);
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

  function handleModeSubmit(value) {
    setValues({email: userData.email, name: userData.name});
    setMode(value);
  }

  function validateForm(name, value) {
    setIsValid({ ...isValid, [name]: value });
  }

  function onInputChange(e){
    onChange(e);
    setReqStatusText("");
  }

  function updateMyInfo(e, newValue) {
    e.preventDefault();
    setIsFormActive(false);
    api
      .updateProfileInfo(newValue)
      .then((res) => {
        setIsFormActive(true);
        setUserData(res);
        setReqStatusText(projectConstants.messages.profileDataWasUpdated);
        setReqStatus(true)
      })
      .catch((err) => {
        setIsFormActive(true);
        console.log(err);
        setReqStatusText(`${projectConstants.messages.profileDataUpdateError} ${err.message}`);
        setReqStatus(false)
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
          isFormActive={isFormActive}
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
          isFormActive={isFormActive}
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
              onClick={() => handleModeSubmit(false)}
              buttonText={profileData.saveButtonText}
              isFormActive={isFormActive}
            />
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => handleModeSubmit(true)}
              className="profile__edit-button"
            >
              {profileData.editButtonText}
            </button>
            <button
              type="button"
              onClick={signout}
              className="profile__logout-button"
            >
              {profileData.exitButtonText}
            </button>
          </>
        )}
      </form>
    </section>
  );
}
