/* eslint-disable default-case */
import { useEffect, useState } from "react";

export const useValidation = ({initialValue, regax, advancedValidation}) => {
  const [validationValues, setValidationValues] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationResult, setValidationResult] = useState(initialValue);

  useEffect(() => {
    setValidationResult({ "isValid": isValid, "error": errorMessage })
      ;
  }, [isValid, errorMessage]);

  return {
    validationResult,
    onChangee: (e) => {
      let inputValue = e.target.value;
      if (e.target.validity.valid) {
        if (!advancedValidation || String(inputValue)
          .toLowerCase()
          .match(regax) ? true : false) 
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

