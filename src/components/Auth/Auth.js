import React from "react";
import { Link } from "react-router-dom";

// import { useForm } from "../../hooks/useForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import Preloader from "../Preloader/Preloader";

import './Auth.css';

function Auth({
    formName,
    // header,
    buttonTitle, buttonTitleSend,
    caption, link, linkTo,
    // formValue, setFormValue, // Эти данные лишние, их (здесь, ранее и далее) можно удалить
    // isLoading,

    submitForm,
    isSending, message, setMessage,
    ...props
  }) {

  // const EMAIL_REGEXP = /^[A-z0-9._\-]+@[A-z0-9.\-]+\.[A-z]{2,}$/;

  // const { values, handleChange, setValues } = useForm();
  // const { values, handleChange, resetForm, errors, isValid, setValues, setIsValid } = useFormWithValidation();
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log(`Отправка формы ${formName}`);

    submitForm(values);
  }

  React.useEffect(() => {
    setMessage(null);
  }, [ setMessage ]);

  // Лишнее, можно убрать.
  // Нужно только когда требуется заполнять форму актуальными данными при открытии (попапа, страницы и т.п.)
  // React.useEffect(() => {
  //   if (formValue) {
  //     resetForm(formValue, {}, true);
  //   }
  // }, [ formValue, resetForm ]);

  // Лишнее, можно убрать.
  // Нужно только когда требуется заполнять форму актуальными данными при открытии (попапа, страницы и т.п.)
  // React.useEffect(() => {
  //   if (formValue) {
  //     setValues(formValue);
  //   }
  // }, [formValue, setValues]);


  return (
    <>
      { isSending ? (
        <Preloader />
      ) : (
        <form
          className={`auth__form auth__form_${formName}`}
          id={`form-${formName}`}
          name={formName}
          onSubmit={handleSubmit}
          noValidate
        >
          { formName === "register" && (
            <div className="auth__input-container">
              <label className="auth__label auth__label_name">
                <span className="auth__input-heading auth__input-heading_name">Имя</span>
                <input
                  className="auth__input auth__input_name"
                  name="name"
                  id="name"
                  type="text"
                  pattern="[A-zА-я\sё \-]{1,}$"
                  value={values.name || ""}
                  onChange={handleChange}
                  placeholder="Имя"
                  minLength="2"
                  maxLength="30"
                  // autoFocus="autofocus"
                  required
                  disabled={isSending}
                  />
              </label>
              <span className="auth__input-error auth__input-error_name">
                { errors.name || "" }
              </span>
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
                // pattern="[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+$"
                // pattern="[a-zA-Z0-9._\-']+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                pattern="[A-z0-9._\-]+@[A-z0-9.\-]+\.[A-z]{2,}$"
                value={values.email || ""}
                onChange={handleChange}
                placeholder="E-mail"
                minLength="6"
                maxLength="40"
                // autoFocus={formName === 'register' ? '' : 'autofocus'}
                required
                disabled={isSending}
                />
            </label>
            <span className="auth__input-error auth__input-error_email">
              { errors.email || "" }
              {/* { (errors.email && "Пожалуйста, используйте требуемый формат: email@email.ru") || "" } */}
            </span>
          </div>

          <div className="auth__input-container">
            <label className="auth__label auth__label_password">
              <span className="auth__input-heading auth__input-heading_password">Пароль</span>
              <input
                className="auth__input auth__input_password"
                name="password"
                id="password"
                type="password"
                value={values.password || ""}
                onChange={handleChange}
                placeholder="Пароль"
                minLength="2"
                maxLength="30"
                required
                disabled={isSending}
                />
            </label>
            <span className="auth__input-error auth__input-error_password">
              { errors.password || "" }
            </span>
          </div>

          <div className="auth__error-container">
            <span className="auth__error-message">{message}</span>
          </div>

          <div className="auth__button-container">
            <button
              className={`auth__button button ${(!isValid) && 'auth__button_disabled'}`}
              type="submit"
              disabled={!isValid}
            >
            {/* <button
              className={`auth__button button ${(isSending || !isValid) && 'auth__button_disabled'}`}
              type="submit"
              disabled={isSending || !isValid}
            > */}
              {/* { isSending ? "Вход..." : "Войти" } */}
              { isSending ? buttonTitleSend : buttonTitle }
            </button>

            {/* <p className='auth__caption'>Ещё не зарегистрированы? {" "}
              <Link to="/signup" className="auth__link">Регистрация</Link>
            </p> */}
            <p className='auth__caption'>{caption} {" "}
              <Link to={linkTo} className="auth__link link">{link}</Link>
            </p>
          </div>
        </form>
      )}
    </>
  );
}

export default Auth;
