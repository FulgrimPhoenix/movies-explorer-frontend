import { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import "./Profile.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export function Profile({ profileData, logOut }) {
  const { profileName, profileEmail } = useContext(CurrentUserContext);
  const { values, onChange, setValues } = useForm({});
  const [isEditMode, setMode] = useState(false);

  useEffect(() => setValues({name: profileName, email: profileEmail}), []);

  function handleModeSubmit(field) {
    setMode(!isEditMode);
  }

  return (
    <main className="profile">
      <h1 className="profile__title">{profileData.title(profileName)}</h1>
      <form className="profile__form" onSubmit={(e) => e.preventDefault()}>
        <div className="profile__input-cell">
          <h2 className="profile__input-title">Имя</h2>
          {isEditMode ? (
            <input
              className="profile__input profile__input_active"
              name="name"
              value={values["name"] || profileName}
              onChange={onChange}
              type="text"
              minLength={2}
              maxLength={18}
            />
          ) : (
            <p className="profile__input">{values["name"]}</p>
          )}
        </div>
        <div className="profile__input-cell">
          <h2 className="profile__input-title">Почта</h2>
          {isEditMode ? (
            <input
              className="profile__input profile__input_active"
              name="email"
              value={values["email"] || profileEmail}
              onChange={onChange}
              type="text"
              minLength={2}
              maxLength={18}
            />
          ) : (
            <p className="profile__input ">{values["email"]}</p>
          )}
        </div>
        {isEditMode ? (
          <button
            onClick={() => handleModeSubmit()}
            className="profile__save-button"
          >
            Сохранить
          </button>
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
    </main>
  );
}
