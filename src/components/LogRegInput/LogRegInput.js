import React from "react";
import "./LogRegInput.css";
import { useValidation } from "../../hooks/useValidation";

export function LogRegInput({
  title,
  inputType,
  minLength,
  maxLength,
  onChange,
  value,
  name,
  placeholder
}) {
  
  const {validationResult, onChangee, setValidationValues} = useValidation({});

  return (
    <div className="log-reg-input">
      <h2 className="log-reg-input__title">{title}</h2>
      <input
        name={name}
        className="log-reg-input__input"
        onChange={onChange}
        onInput={(e) => onChangee(e)}
        value={value||""}
        type={inputType}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
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
