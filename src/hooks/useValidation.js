/* eslint-disable default-case */
import { useEffect, useState } from "react";

export const useValidation = ({initialValue, regax, advancedValidation}) => {
  const [validationValues, setValidationValues] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationResult, setValidationResult] = useState(initialValue);

  useEffect(() => {
    setValidationResult({ "isValid": isValid, "errorMessage": errorMessage })
      ;
  }, [isValid, errorMessage]);
// Redesign the logic for email validation and develop a new regExp for email
  function inputAdvancedValidation(e){
    const inputValue = e.target.value;
    if (e.target.name === 'email'){
      return String(inputValue)
      .match(regax) ? true : false
    } else {
      return !regax.test(String(inputValue))
    }
  }

  return {
    validationResult,
    onChangee: (e) => {
      if (e.target.validity.valid) {
        if (!advancedValidation || inputAdvancedValidation(e))
          {
            setIsValid(true);
            setErrorMessage("");
        } else {
          setIsValid(false);
          setErrorMessage("Поле заполнено не верно");
        }
      } else {
        setIsValid(e.target.validity.valid);
        setErrorMessage(e.target.validationMessage);
      }
    },
    setValidationValues,
  };
};

