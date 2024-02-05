import { Link } from "react-router-dom";
import { LogRegForm } from "../LogRegForm/LogRegForm";
import { LogRegInput } from "../LogRegInput/LogRegInput";
import { projectConstants } from "../../utils/constants";
import "./Register.css";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

export function Register({ registerFormData }) {
  const { values, onChange, setValues } = useForm([]);

  useEffect(() => {
    setValues([]);
  }, []);

  return (
    <main className="register">
      <LogRegForm formData={projectConstants.registerFormData}>
        <LogRegInput
          name="name"
          value={values["name"]}
          onChange={onChange}
          title="Имя"
          inputType="text"
          minLength={2}
          maxLength={30}
        />
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
