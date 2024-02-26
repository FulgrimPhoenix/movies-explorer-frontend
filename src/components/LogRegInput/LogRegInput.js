import React, { useEffect } from "react";
import "./LogRegInput.css";
import { UseValidation } from "../../hooks/useValidation";

export function LogRegInput({
  title,
  inputType,
  minLength,
  maxLength,
  onChange,
  value,
  name,
  placeholder,
  validateForm,
  regax,
  advancedValidation,
  isFormActive
}) {
  const { validationResult, onChangee, isValid } = UseValidation({
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
    <div className="log-reg-input">
      <h2 className="log-reg-input__title">{title}</h2>
      <input
        name={name}
        className="log-reg-input__input"
        onChange={(e) => onInputChange(e)}
        value={value || ""}
        type={inputType}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete="new-password"
        disabled = {(isFormActive)? "" : "disabled"}
      />
      <span
        className={`log-reg-input__error-message ${
          validationResult.isValid ? "" : "log-reg-input__error-message-active"
        }`}
      >
        {validationResult.errorMessage}
      </span>
    </div>
  );
}
