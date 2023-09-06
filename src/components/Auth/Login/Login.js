import React from 'react';

import Logo from "../../Header/Logo/Logo";
import Auth from "../Auth";

// import './Login.css';

function Login({ onLogin }) {

  const [formValue, setFormValue] = React.useState({ email: '', password: '' });

  // const isLoading = false;

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log('Отправка формы входа', e);
  //   // setFormEdit(false);
  //   // onLogin(values);
  // }

  return (
    <main className="auth">
      <div className="auth__container">
        <div className="auth__logo"><Logo /></div>

        <h1 className="auth__header">Рады видеть!</h1>
        <Auth
          formName="login"
          // formInput={{name: "Имя", email: "E-mail", password: "Пароль"}}
          // header="Рады видеть!"
          buttonTitle="Войти"
          buttonTitleSend="Вход..."
          caption="Ещё не зарегистрированы?"
          link="Регистрация"
          linkTo="/signup"

          submitForm={onLogin}
          formValue={formValue}
          setFormValue={setFormValue}
        />
      </div>
    </main>

    // <main className="login auth">
    //   <h1 className="auth__header">Рады видеть!</h1>
    //   <form className="auth__form auth__form_login" id="form__login" name="login" onSubmit={handleSubmit} noValidate>

    //     <div className="auth__input-container">
    //       <label className="auth__label auth__label_email">
    //         <span className="auth__input-heading auth__input-heading_email">E-mail</span>
    //         <input
    //           className="auth__input auth__input_email"
    //           name="email"
    //           id="email"
    //           type="email"
    //           // value={formValue.email}
    //           // onChange={handleChange}
    //           placeholder=""
    //           minLength="6"
    //           autoFocus
    //           required
    //           />
    //       </label>
    //       <span className="auth__input-error auth__input-error_email"></span>
    //     </div>

    //     <div className="auth__input-container">
    //       <label className="auth__label auth__label_password">
    //         <span className="auth__input-heading auth__input-heading_password">Пароль</span>
    //         <input
    //           className="auth__input auth__input_password"
    //           name="password"
    //           id="password"
    //           type="password"
    //           // value={formValue.email}
    //           // onChange={handleChange}
    //           placeholder=""
    //           minLength="2"
    //           maxLength="30"
    //           required
    //           />
    //       </label>
    //       <span className="auth__input-error auth__input-error_password">Какая-то ошибка в пароле</span>
    //     </div>

    //     <div className="auth__button-container">

    //       <button className={`auth__button button ${isLoading && 'auth__button_disabled'}`} type="submit" disabled={isLoading}>
    //         {isLoading ? "Вход..." : "Войти"}
    //       </button>

    //       <p className='auth__caption'>Ещё не зарегистрированы? {" "}
    //         <Link to="/signup" className="auth__link">Регистрация</Link>
    //       </p>

    //     </div>
    //   </form>

    // </main>
  );
}

export default Login;
