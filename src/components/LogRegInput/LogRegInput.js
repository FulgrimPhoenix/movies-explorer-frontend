import React from "react";
import "./LogRegInput.css";

export function LogRegInput({
  title,
  inputType,
  minLength,
  maxLength,
  onChange,
  value,
  name,
}) {
  const [isValid, setIsValid] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  function checkForValid(e) {
    setIsValid(e.target.validity.valid);
    setErrorMessage(e.target.validationMessage);
  }

  return (
    <div className="log-reg-input">
      <h2 className="log-reg-input__title">{title}</h2>
      <input
        name={name}
        className="log-reg-input__input"
        onChange={onChange}
        onInput={(e) => checkForValid(e)}
        value={value||""}
        type={inputType}
        minLength={minLength}
        maxLength={maxLength}
      />
      <span
        className={`log-reg-input__error-message ${
          isValid ? "" : "log-reg-input__error-message-active"
        }`}
      >
        {errorMessage}
      </span>
    </div>
  );
}
