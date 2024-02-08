import { Link } from "react-router-dom";
import { LogRegForm } from "../LogRegForm/LogRegForm";
import { LogRegInput } from "../LogRegInput/LogRegInput";
import { projectConstants } from "../../utils/constants";
import "./Register.css";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import { useValidation } from "../../hooks/useValidation";

export function Register({ registerFormData }) {
  const { values, onChange, setValues } = useForm([]);
  const {validationValues, onChangee, setvalidationValues} = useValidation({})

  useEffect(() => {
    setValues({});
  }, []);

  function onInputChange(e){
    onChange(e);
  }

  return (
    <main className="register">
      <LogRegForm formData={projectConstants.registerFormData}>
        <LogRegInput
          name="name"
          value={values["name"]}
          onChange={onInputChange}
          title="Имя"
          inputType="text"
          minLength={2}
          maxLength={30}
          placeholder={"Илья"}
          regax={/[a-zа-я\sё-]/g}
          advancedValidation={true}
        />
        <LogRegInput
          name="email"
          value={values["email"]}
          onChange={onInputChange}
          title="email"
          inputType="email"
          minLength={10}
          maxLength={30}
          placeholder={"test@mail.ru"}
          regax={/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
          advancedValidation={true}
        />
        <LogRegInput
          name="password"
          value={values["password"]}
          onChange={onInputChange}
          title="Пароль"
          inputType="password"
          minLength={8}
          maxLength={16}
          placeholder={"Strong8Password!"}
          regax={null}
          advancedValidation={false}
        />
      </LogRegForm>
      <p className="register__redirect-line">
        {registerFormData.redirectLine}
        <Link
          className="register__redirect-link"
          to={registerFormData.redirectLink}
        >
          {registerFormData.redirectText}
        </Link>
      </p>
    </main>
  );
}
