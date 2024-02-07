/* eslint-disable default-case */
import { useState } from "react";

export const useValidation = (initialValue) => {
  const [validationValues, setValidationValues] = useState(initialValue);

  // const check = (inputValue) => {
  //   console.log(inputValue);

  //   Object.keys(inputValue).forEach((value) => {
  //     console.log(value, inputValue[value]);
  //     setValidationValues({ ...validationValues, [value]: inputValue[value] });

  // switch (value) {
  //   case "email":
  //     console.log(inputValue[value])
  // console.log(1, inputValue["email"]);
  // setValidationValues({ ...validationValues,
  //   ["email"]: inputValue["email"]
  //     /* String(inputValue["email"])
  //       .toLowerCase()
  //       .match(
  //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //       ) ? true : false */,
  // });

  // case "name":
  //   console.log(inputValue[value]);
  //   setValidationValues(...validationValues, [value]: inputValue[value])
  // console.log(2, inputValue["name"]);
  // const regex = /^[a-zа-я\sё-]/gi;
  // const str = 'Yandex 2020. Ещё не вечер-!';
  // console.log(regex.test(str), 3);
  // console.log(str.match(regex).join(''));
  // setValidationValues({ ...validationValues,
  //   "name": inputValue["name"]
  //     String(inputValue["name"])
  //       .toLowerCase()
  //       .match(
  //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //       ) ? true : false,
  // });
  //   });
  // };

  return {
    validationValues,
    onChangee: (e) => {
      console.log(validationValues);
      setValidationValues({...validationValues, [e.target.name]: e.target.value });
    },
    setValidationValues,
  };
};
