import { Link } from "react-router-dom";
import "./LogRegForm.css";

export function LogRegForm({ children, formData }) {
  return (
    <form className="log-reg-form" noValidate>
      <Link className="log-reg-form__logo" to="/">
        <picture>
          <img src={formData.logo} alt="Логотип" />
        </picture>
      </Link>
      <h1 className="log-reg-form__title">{formData.title}</h1>
      {children}
      <button className="log-reg-form__button">{formData.buttonText}</button>
    </form>
  );
}
