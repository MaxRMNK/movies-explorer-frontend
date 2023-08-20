// import { Link } from "react-router-dom";
import Auth from "../Auth";

// import './Register.css';

function Register() {

  // const isLoading = false;

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log('Отправка формы регистрации');
  //   // setFormEdit(false);
  // }

  return (
    <main className="auth">
      <h1 className="auth__header">Добро пожаловать!</h1>
      <Auth
        formName="register"
        buttonTitle="Зарегистрироваться"
        buttonTitleSend="Регистрация..."
        caption="Уже зарегистрированы?"
        link="Войти"
        linkTo="/signin"
      />
    </main>

    // <main className="register auth">
    //   <h1 className="auth__header">Добро пожаловать!</h1>
    //   <form className="auth__form auth__form_register" id="form__register" name="register" onSubmit={handleSubmit} noValidate>

    //     <div className="auth__input-container">
    //       <label className="auth__label auth__label_name">
    //         <span className="auth__input-heading auth__input-heading_name">Имя</span>
    //         <input
    //           className="auth__input auth__input_name"
    //           name="name"
    //           id="name"
    //           type="text"
    //           // value={formValue.name}
    //           // onChange={handleChange}
    //           placeholder=""
    //           minLength="2"
    //           maxLength="30"
    //           autoFocus
    //           required
    //           />
    //       </label>
    //       <span className="auth__input-error auth__input-error_name"></span>
    //     </div>

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
    //         {isLoading ? "Регистрация..." : "Зарегистрироваться"}
    //       </button>

    //       <p className='auth__caption'>Уже зарегистрированы? {" "}
    //         <Link to="/signin" className="auth__link">Войти</Link>
    //       </p>

    //     </div>
    //   </form>
    // </main>
  );
}

export default Register;
