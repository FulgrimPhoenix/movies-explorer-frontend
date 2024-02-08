/* eslint-disable default-case */
import { useEffect, useState } from "react";

export const useValidation = (initialValue) => {
  const [validationValues, setValidationValues] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationResult, setValidationResult] = useState(initialValue)

  useEffect(() => {
    setValidationResult({ "isValid": isValid, "error": errorMessage })
    console.log(validationResult);
    ;
  }, [isValid]);

  //   ["email"]: inputValue["email"]



  // const regex = /^[a-zа-я\sё-]/gi;
  // const str = 'Yandex 2020. Ещё не вечер-!';
  // console.log(regex.test(str), 3);
  // console.log(str.match(regex).join(''));


  return {
    validationResult,
    onChangee: (e) => {
      if (e.target.validity.valid) {

        setIsValid(String(e.target.value)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) ? true : false);

        isValid ? setErrorMessage("") : setErrorMessage("Поле заполнено не верно");
      } else {
        setErrorMessage(e.target.validationMessage)
        setIsValid(false)

      }
    },
    setValidationValues,
  };
};
