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
      <LogRegForm formData={projectConstants.registerFormData}>
        <LogRegInput
          name="email"
          value={values["email"]}
          onChange={onChange}
          title="email"
          inputType="email"
          minLength={10}
          maxLength={30}
        />
        <LogRegInput
          name="password"
          value={values["password"]}
          onChange={onChange}
          title="Пароль"
          inputType="password"
          minLength={8}
          maxLength={16}
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
