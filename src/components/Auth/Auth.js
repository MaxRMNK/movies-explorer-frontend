import { Link } from "react-router-dom";

import './Auth.css';

function Auth({
  formName,
  // header,
  buttonTitle, buttonTitleSend,
  caption, link, linkTo,
  ...props
}) {

  console.log(props);

  const isLoading = false;

  function handleSubmit(e) {
    e.preventDefault();
    console.log(`Отправка формы ${formName}`);
    // setFormEdit(false);
  }

  return (
    <form className={`auth__form auth__form_${formName}`} id={`form_${formName}`} name={formName} onSubmit={handleSubmit} noValidate>
      { formName === "register" && (
      <div className="auth__input-container">
        <label className="auth__label auth__label_name">
          <span className="auth__input-heading auth__input-heading_name">Имя</span>
          <input
            className="auth__input auth__input_name"
            name="name"
            id="name"
            type="text"
            // value={formValue.name}
            // onChange={handleChange}
            placeholder=""
            minLength="2"
            maxLength="30"
            autoFocus="autofocus"
            required="true"
            />
        </label>
        <span className="auth__input-error auth__input-error_name"></span>
      </div>
      )}

      <div className="auth__input-container">
        <label className="auth__label auth__label_email">
          <span className="auth__input-heading auth__input-heading_email">E-mail</span>
          <input
            className="auth__input auth__input_email"
            name="email"
            id="email"
            type="email"
            // value={formValue.email}
            // onChange={handleChange}
            placeholder=""
            minLength="6"
            autoFocus={formName === 'register' ? '' : 'autofocus'}
            required="true"
            />
        </label>
        <span className="auth__input-error auth__input-error_email"></span>
      </div>

      <div className="auth__input-container">
        <label className="auth__label auth__label_password">
          <span className="auth__input-heading auth__input-heading_password">Пароль</span>
          <input
            className="auth__input auth__input_password"
            name="password"
            id="password"
            type="password"
            // value={formValue.email}
            // onChange={handleChange}
            placeholder=""
            minLength="2"
            maxLength="30"
            required
            />
        </label>
        <span className="auth__input-error auth__input-error_password">Какая-то ошибка в пароле</span>
      </div>

      <div className="auth__button-container">

        <button className={`auth__button button ${isLoading && 'auth__button_disabled'}`} type="submit" disabled={isLoading}>
          {/* { isLoading ? "Вход..." : "Войти" } */}
          { isLoading ? buttonTitleSend : buttonTitle }
        </button>

        {/* <p className='auth__caption'>Ещё не зарегистрированы? {" "}
          <Link to="/signup" className="auth__link">Регистрация</Link>
        </p> */}
        <p className='auth__caption'>{caption} {" "}
          <Link to={linkTo} className="auth__link">{link}</Link>
        </p>

      </div>
    </form>
  );
}

export default Auth;
