import "./LogRegForm.css";

export function LogRegForm( {children, formData }) {
  return (
    <form className="log-reg-form" noValidate>
      <picture className="log-reg-form__logo">
        <source srcSet={formData.logo} media="(min-width: 600px)" type="image/svg" />
        <img
          src={formData.legacyLogo}
          alt="logo"
        />
      </picture>
      <h1 className="log-reg-form__title">{formData.title}</h1>
      {children}
      <button className="log-reg-form__button">{formData.buttonText}</button>
    </form>
  );
}
