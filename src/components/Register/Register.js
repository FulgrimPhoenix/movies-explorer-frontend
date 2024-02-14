import { Link, useNavigate } from "react-router-dom";
import { LogRegForm } from "../LogRegForm/LogRegForm";
import { LogRegInput } from "../LogRegInput/LogRegInput";
import { projectConstants } from "../../utils/constants";
import "./Register.css";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import { useUrlPathName } from "../../hooks/useUrlPathName";
import { api } from "../../utils/Api";

export function Register({ registerFormData, handleSetIsLoggedIn }) {
  const { values, onChange, setValues } = useForm([]);
  const [isValid, setIsValid] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [serverError, setServerError] = useState("");
  const currentPath = useUrlPathName();
  const navigate = useNavigate();

  useEffect(() => {
    setValues({});
    setIsValid({ name: false, email: false, password: false });
    setIsButtonActive(false);
  }, []);

  useEffect(() => {
    if (Object.values(isValid).every((item) => item)) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [isValid, currentPath]);

  function validateForm(name, value) {
    setIsValid({ ...isValid, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    api
      .signup(values)
      .then((res) => {
        if (res.status === 201) {
          setServerError("");
          api
            .signin(values)
            .then(() => {
              handleSetIsLoggedIn();
              navigate("/movies", { replace: true });
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (res.status === 400) {
          throw new Error("Данные введены не верно");
        } else if (res.status === 409) {
          throw new Error("Пользователь с таким email уже существует");
        } else {
          throw new Error("Ошибка на сервере");
        }
      })
      .catch((err) => {
        setServerError(err.message);
      });
  }

  return (
    <main className="register">
      <LogRegForm
        formData={projectConstants.registerFormData}
        isButtonActive={isButtonActive}
        redirectLink={"/movies"}
        onSubmit={handleSubmit}
        serverErrorMessage={serverError}
      >
        <LogRegInput
          name="name"
          value={values["name"]}
          onChange={onChange}
          title="Имя"
          inputType="text"
          minLength={2}
          maxLength={30}
          validateForm={validateForm}
          placeholder={"Илья"}
          regax={/[^a-zа-я\sё-]/gi}
          advancedValidation={true}
        />
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
