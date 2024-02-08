import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { projectConstants } from "../../utils/constants";
import { LogRegForm } from "../LogRegForm/LogRegForm";
import { LogRegInput } from "../LogRegInput/LogRegInput";
import "./Login.css";
import { useEffect } from "react";

export function Login({ loginFormData }) {
  const { values, onChange, setValues } = useForm({});

  useEffect(() => setValues({}), []);

  return (
    <main className="login">
      <LogRegForm formData={projectConstants.loginFormData}>
        <LogRegInput
          name="email"
          value={values["email"]}
          onChange={onChange}
          title="email"
          inputType="email"
          minLength={10}
          maxLength={30}
          placeholder={"test@mail.ru"}
          regax={/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i}
          advancedValidation={true}
        />
        <LogRegInput
          name="password"
          value={values["password"]}
          onChange={onChange}
          title="Пароль"
          inputType="password"
          minLength={8}
          maxLength={16}
          placeholder={"Strong8Password!"}
          regax={null}
          advancedValidation={false}
        />
      </LogRegForm>
      <p className="login__redirect-line">
        {loginFormData.redirectLine}
        <Link className="login__redirect-link" to={loginFormData.redirectLink}>
          {loginFormData.redirectText}
        </Link>
      </p>
    </main>
  );
}
