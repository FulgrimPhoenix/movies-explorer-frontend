import { useEffect } from "react";
import { UseValidation } from "../../hooks/useValidation";

export function ProfileInput({
  name,
  inputTitle,
  value,
  onChange,
  validateForm,
  isEditMode,
  profileData,
  regax,
  advancedValidation,
  setIsButtonActive,
  disabled,
}) {
  const { onChangee, isValid } = UseValidation({
    initialValue: { isValid: false, error: "" },
    regax: regax,
    advancedValidation: advancedValidation,
  });

  useEffect(() => {
    validateForm(name, isValid);
  }, [isValid]);

  function onInputChange(e) {
    onChange(e);
    onChangee(e);
  }

  return (
    <div className="profile__input-cell">
      <h2 className="profile__input-title">{inputTitle}</h2>
      {isEditMode ? (
        <input
          className="profile__input profile__input_active"
          name={name}
          value={value || ""}
          onChange={(e) => onInputChange(e)}
          type="text"
          minLength={2}
          maxLength={18}
        />
      ) : (
        <p className="profile__input">{profileData}</p>
      )}
    </div>
  );
}
