import React from 'react';

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import Preloader from "../Preloader/Preloader";

import './Profile.css';

function Profile({
    handleSignOut, handleUpdateUser,
    isSending, message, setMessage,
  }) {

  const currentUser = React.useContext(CurrentUserContext);
  // console.log(currentUser);

  // const [formValue, setFormValue] = React.useState(currentUser);

  const [isFormEdit, setIsFormEdit] = React.useState(false); // Редактирование профиля
  const [submitButtonStatus, setSubmitButtonStatus] = React.useState(true); // Блокировка кнопки "Сохранить изменения"

  // const { values, handleChange, setValues } = useForm();
  // const { values, handleChange, resetForm, errors, isValid, setValues, setIsValid } = useFormWithValidation();
  const { values, handleChange, resetForm, errors, isValid, setValues, setIsValid } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log(`Отправка формы edit-profile`);

    handleUpdateUser(values);

    if (message.successful === false) {
      setIsFormEdit(false);
    }
  }

  React.useEffect(() => {
    // setMessage(null);
    setMessage({ show: false, successful: true, text: '', });
  }, [ setMessage ]);

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
    // setValues({
    //   name: currentUser.name,
    //   email: currentUser.email,
    // });
  }, [ currentUser, resetForm ]); //, setValues


  // Включает отправку формы если данные полей отличаются от Контекста и отсутствуют ошибки валидации
  React.useEffect(() => {
      // && (errors.name === undefined || errors.name === "") // true
      // && (errors.email === undefined || errors.email === "") // true
    if ( (values.name !== currentUser.name || values.email !== currentUser.email) && isValid ) {
      setSubmitButtonStatus(false);
    } else {
      setSubmitButtonStatus(true);
    }
  }, [ values, currentUser, isValid ]); // , errors



  // -----------------------------------------------------------------------------
  // Не нужно проверять включено ли редактирование формы, т.к. кнопка заблокирована
  // проверкой на равенство текущих значений полей и значений в currentUser
  // React.useEffect(() => {
  //   setSubmitButtonStatus(isFormEdit)
  // }, [ isFormEdit ]);



  // -----------------------------------------------------------------------------
  // // let togleClassCheck = !isFormEdit ? ' form__button_hidden' : '';

  // // useEffect(() => {
  // //   setFormValue(currentUser)
  // // }, [ currentUser ]);

  const handleEditForm = () => {
    if (isFormEdit) {
      setIsFormEdit(false);
      // values.name = currentUser.name;
      // values.email = currentUser.email;
      // setIsValid(true);
      resetForm(currentUser, {}, true);
    } else {
      setIsFormEdit(true);
    }
  }

  // const handleChange = (evt) => {
  //   const {name, value} = evt.target;
  //   setFormValue({
  //     ...formValue,
  //     [name]: value
  //   });
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   // console.log('сохранить профиль', e);
  //   // console.log('formValue', formValue);

  //   handleUpdateUser(formValue)
  //   setIsFormEdit(false);
  // }

  return (
    <main className="profile main">
      <div className="profile__container">
        <h1 className="profile__greeting">Привет, {currentUser.name}!</h1>
        <form
          className="form form_edit-profile"
          id="form-edit-profile"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form__input-container">
            <label className="form__input">
              <span className="form__input-label label label_profile">Имя</span>
              <input
                className="form__input-text input-text input-text_align_right"
                name="name"
                id="name"
                type="text"
                pattern="[A-zА-я\sё \-]{1,}$"
                value={values.name || ""}
                onChange={handleChange}
                placeholder="Введите имя"
                minLength="2"
                maxLength="30"
                required
                disabled={!isFormEdit}
                />
            </label>
            { isFormEdit && (
              <span className="form__input-error">
                { errors.name || "" }
              </span>
            )}
          </div>

          <div className="form__input-container">
            <label className="form__input">
              <span className="form__input-label label label_profile">E-mail</span>
              <input
                className="form__input-text form__input-text_last input-text input-text_align_right"
                name="email"
                id="email"
                type="email"
                pattern="[A-z0-9._\-]+@[A-z0-9.\-]+\.[A-z]{2,}$"
                value={values.email || ""}
                onChange={handleChange}
                placeholder="Укажите адрес электронной почты"
                minLength="6"
                maxLength="40"
                required
                disabled={!isFormEdit}
                />
            </label>
            { isFormEdit && (
            <span className="form__input-error">
              { errors.email || "" }
            </span>
            )}
          </div>

        </form>

        <div className="auth__error-container">
          <span className="auth__error-message">{message.text}</span>
        </div>

        <div className="profile__buttons">
          <button
            type="submit"
            form="form-edit-profile"
            name="Save"
            className={`profile__button-submit button ${!isFormEdit && 'button_hidden'}`}
            // className={`profile__button profile__button_submit button ${!isFormEdit && 'button_hidden'}`}
            // disabled={!isFormEdit}
            disabled={submitButtonStatus}
            >Сохранить изменения</button>

          <button
            type="button"
            name="Edit"
            className={`profile__button profile__button_edit button`}
            // disabled={isFormEdit}
            onClick={handleEditForm}
            >{!isFormEdit ? "Редактировать" : "Отменить редактирование"}</button>

          <button
            type="button"
            name="LogOut"
            className="profile__button profile__button_logout button"
            onClick={handleSignOut}
            >Выйти из аккаунта</button>
        </div>

        {/* {isFormEdit === false &&
          (<button type="button" name="Edit" className="profile__button profile__button_edit button" onClick={handleEditForm}>Редактировать</button>)
        } */}
        {/* <button type="button" name="LogOut" className="profile__button profile__button_logout button">Выйти из аккаунта</button> */}
      </div>
    </main>
  );
}

export default Profile;
