import { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import "./Profile.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ProfileInput } from "../ProfileInput/ProfileInput";
import { FormButton } from "../FormButton/FormButton";

export function Profile({ profileData, logOut }) {
  const { profileName, profileEmail } = useContext(CurrentUserContext);
  const { values, onChange, setValues } = useForm({});
  const [isValid, setIsValid] = useState({
    name: false,
    email: true,
  });
  const [isEditMode, setMode] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(true);

  useEffect(() => {
    setIsValid({
      name: false,
      email: true,
    });
    setValues({ name: profileName, email: profileEmail });
    setIsButtonActive(false);
  }, []);

  useEffect(() => {
    if (Object.values(isValid).every((item) => item)) {
      if(values["name"] === profileName && values["email"] === profileEmail){
        setIsButtonActive(false);
      }else{
        setIsButtonActive(true);
      }
    } else {
      setIsButtonActive(false);
    }
  }, [isValid, Object.values(values)]);

  function handleModeSubmit(field) {
    setMode(!isEditMode);
  }

  function validateForm(name, value) {
    setIsValid({ ...isValid, [name]: value });
  }

  return (
    <section className="profile">
      <h1 className="profile__title">{profileData.title(profileName)}</h1>
      <form className="profile__form" onSubmit={(e) => e.preventDefault()}>
        <ProfileInput
          name={"name"}
          inputTitle={"Имя"}
          value={values["name"]}
          profileData={profileName}
          onChange={onChange}
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
          profileData={profileEmail}
          onChange={onChange}
          validateForm={validateForm}
          isEditMode={isEditMode}
          regax={
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
          }
          advancedValidation={true}
          setIsButtonActive={setIsButtonActive}
        />
        {isEditMode ? (
          <FormButton
            buttonStyle="profile__save-button"
            isButtonActive={isButtonActive}
            onClick={handleModeSubmit}
            buttonText="Сохранить"
          />
        ) : (
          <>
            <button
              onClick={() => handleModeSubmit()}
              className="profile__edit-button"
            >
              Редактировать
            </button>
            <button onClick={() => logOut()} className="profile__logout-button">
              Выйти из аккаунта
            </button>
          </>
        )}
      </form>
    </section>
  );
}
