import { Link, useNavigate } from "react-router-dom";
import "./LogRegForm.css";
import { FormButton } from "../FormButton/FormButton";

export function LogRegForm({
  children,
  formData,
  isButtonActive,
  redirectLink,
  onSubmit
}) {

  function onClick(e) {
    e.preventDefault();
    console.log("меня нажали");
  }

  return (
    <form onSubmit={onSubmit} className="log-reg-form" noValidate>
      <Link className="log-reg-form__logo" to="/">
        <picture>
          <img src={formData.logo} alt="Логотип" />
        </picture>
      </Link>
      <h1 className="log-reg-form__title">{formData.title}</h1>
      {children}
      <FormButton
        buttonStyle="log-reg-form__button"
        isButtonActive={isButtonActive}
        onClick={onClick}
        buttonText={formData.buttonText}
      />
    </form>
  );
}
