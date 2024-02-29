
import { useState } from "react";

export const UseValidation = ({ initialValue, regax, advancedValidation }) => {
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationResult, setValidationResult] = useState(initialValue);

  function inputAdvancedValidation(e) {
    const inputValue = e.target.value;
    if (e.target.name === "email") {
      return String(inputValue).match(regax) ? true : false;
    } else {
      return !regax.test(String(inputValue));
    }
  }

  return {
    validationResult,
    onChangee: (e) => {
      if (e.target.validity.valid) {
        if (!advancedValidation || inputAdvancedValidation(e)) {
          setIsValid(true);
          setErrorMessage("");
          setValidationResult({ isValid: true, errorMessage: "" });
          return
        } else {
          setIsValid(false);
          setErrorMessage("Поле заполнено не верно");
          setValidationResult({
            isValid: false,
            errorMessage: "Поле заполнено не верно",
          });
          return
        }
      } else {
        setIsValid(e.target.validity.valid);
        setErrorMessage(e.target.validationMessage);
        setValidationResult({
          isValid: e.target.validity.valid,
          errorMessage: e.target.validationMessage,
        });
        return
      }
    },
    isValid,
    setIsValid
  };
};
