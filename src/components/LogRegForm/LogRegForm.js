import { Link, useNavigate } from "react-router-dom";
import "./LogRegForm.css";

export function LogRegForm({ children, formData, isButtonActive, redirectLink }) {
  const navigate =useNavigate();

  function onClick(e){
    e.preventDefault();
    console.log('меня нажали');
    
  }
  function onSubmit(e){
    e.preventDefault();
    navigate(redirectLink, { replace: true });    
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
      {isButtonActive ? (
        <button className="log-reg-form__button" onClick={onClick}>{formData.buttonText}</button>
      ) : (
        <button className="log-reg-form__button" onClick={onClick} disabled>
          {formData.buttonText}
        </button>
      )}
    </form>
  );
}
