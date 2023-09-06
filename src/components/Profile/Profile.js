import { useState, useEffect } from 'react';

import './Profile.css';

function Profile({ onSignOut, userData, onUpdateUser}) {

  const [formValue, setFormValue] = useState({ name: 'Виталий', email: 'pochta@yandex.ru' });
  const [formEdit, setFormEdit] = useState(false); // Редактирование профиля

  // let togleClassCheck = !formEdit ? ' form__button_hidden' : '';

  useEffect(() => {
    setFormValue(userData)
  }, [userData]);

  const handleEditForm = () => {
    setFormEdit(formEdit => !formEdit);
  }

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log('сохранить профиль', e);
    // console.log('formValue', formValue);

    onUpdateUser(formValue)
    setFormEdit(false);
  }

  return (
    <main className="profile main">
      <div className="profile__container">
        <h1 className="profile__greeting">Привет, {formValue.name}!</h1>
        <form className="form form_edit-profile" id="form-edit-profile" onSubmit={handleSubmit} noValidate>
          <div className="form__input-container">
            <label className="form__input">
              <span className="form__input-label label label_profile">Имя</span>
              <input
                className="form__input-text input-text input-text_align_right"
                name="name"
                id="name"
                type="text"
                value={formValue.name}
                onChange={handleChange}
                disabled={!formEdit}
                minLength="2"
                maxLength="30"
                // disabled
                placeholder="Введите имя"
                required
                />
            </label>
            {/* <span className="form__input-error">Какая-то ошибка при редактировании имени пользователя</span> */}
          </div>
          <div className="form__input-container">
            <label className="form__input">
              <span className="form__input-label label label_profile">E-mail</span>
              <input
                className="form__input-text form__input-text_last input-text input-text_align_right"
                name="email"
                id="email"
                type="email"
                value={formValue.email}
                onChange={handleChange}
                disabled={!formEdit}
                minLength="6"
                maxLength="40"
                // disabled="true"
                placeholder="Укажите адрес электронной почты"
                required
                />
            </label>
            {/* <span className="form__input-error">Какая-то ошибка при редактировании адреса электронной почты</span> */}
          </div>
        </form>
        <div className="profile__buttons">
          <button
            type="submit"
            form="form-edit-profile"
            name="Save"
            className={`profile__button-submit button ${!formEdit && 'button_hidden'}`}
            // className={`profile__button profile__button_submit button ${!formEdit && 'button_hidden'}`}
            disabled={!formEdit}
            >Сохранить изменения</button>

          <button
            type="button"
            name="Edit"
            className={`profile__button profile__button_edit button`}
            // disabled={formEdit}
            onClick={handleEditForm}
            >{!formEdit ? "Редактировать" : "Отменить редактирование"}</button>

          <button
            type="button"
            name="LogOut"
            className="profile__button profile__button_logout button"
            onClick={onSignOut}
            >Выйти из аккаунта</button>
        </div>

        {/* {formEdit === false &&
          (<button type="button" name="Edit" className="profile__button profile__button_edit button" onClick={handleEditForm}>Редактировать</button>)
        } */}
        {/* <button type="button" name="LogOut" className="profile__button profile__button_logout button">Выйти из аккаунта</button> */}
      </div>
    </main>
  );
}

export default Profile;
