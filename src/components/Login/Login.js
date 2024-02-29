import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { projectConstants } from "../../utils/constants";
import { LogRegForm } from "../LogRegForm/LogRegForm";
import { LogRegInput } from "../LogRegInput/LogRegInput";
import "./Login.css";
import { useEffect, useState } from "react";
import { api } from "../../utils/MainApi";

export function Login({ loginFormData, handleSetIsLoggedIn }) {
  const { values, onChange, setValues } = useForm({});
  const [isValid, setIsValid] = useState({ email: false, password: false });
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isFormActive, setIsFormActive] = useState(true);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setValues({});
    setIsValid({ email: false, password: false });
    setIsButtonActive(false);
  }, []);

  useEffect(() => {
    if (Object.values(isValid).every((item) => item)) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [isValid]);

  function validateForm(name, value) {
    setIsValid({ ...isValid, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsFormActive(false);
    api
      .signin(values)
      .then((res, req) => {
        if (res.status === 200) {
          setIsFormActive(true);
          setServerError("");
          handleSetIsLoggedIn();
          localStorage.setItem('isLoggedIn', JSON.stringify(true));
          return navigate("/movies", { replace: true });
        } else if (res.status === 401) {
          throw new Error("Неверный логин или пароль");
        } else if (res.status === 400) {
          throw new Error("Данные введены не верно");
        } else {
          throw new Error("Что-то пошло не так");
        }
      })
      .catch((err) => {
        setIsFormActive(true);
        setServerError(err.message);
      });
  }

  return (
    <main className="login">
      <LogRegForm
        formData={projectConstants.loginFormData}
        isButtonActive={isButtonActive}
        redirectLink={"/movies"}
        onSubmit={handleSubmit}
        serverErrorMessage={serverError}
        isFormActive={isFormActive}
      >
        <LogRegInput
          name="email"
          value={values["email"]}
          onChange={onChange}
          title="email"
          inputType="email"
          minLength={10}
          maxLength={30}
          validateForm={validateForm}
          placeholder={"test@mail.ru"}
          regax={
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
          }
          advancedValidation={true}
          isFormActive={isFormActive}
        />
        <LogRegInput
          name="password"
          value={values["password"]}
          onChange={onChange}
          title="Пароль"
          inputType="password"
          minLength={8}
          maxLength={16}
          validateForm={validateForm}
          placeholder={"Strong8Password!"}
          regax={null}
          advancedValidation={false}
          isFormActive={isFormActive}
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
