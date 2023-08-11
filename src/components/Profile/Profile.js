import { useState } from 'react';

import './Profile.css';

function Profile() {

  const [formValue, setFormValue] = useState({ name: 'Виталий', email: 'pochta@yandex.ru' });
  const [formEdit, setFormEdit] = useState(false);

  // let togleClassCheck = !formEdit ? ' form__button_hidden' : '';

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
    console.log('сохранить профиль');
    setFormEdit(false);
  }

  return (
    <main className="profile">
      <h1 className="profile__greeting">Привет, {formValue.name}!</h1>
      <form className="form form__edit-profile" id="form__edit-profile" onSubmit={handleSubmit} noValidate>
        <label className="form__input">
          <span className="form__input-label label label_profile">Имя</span>
          <input
            className="form__input-text input-text input-text_align_right"
            name="name"
            id="name"
            value={formValue.name}
            onChange={handleChange}
            disabled={!formEdit}
            required="true"
            placeholder="Введите свое имя"
            // disabled
            />
        </label>
        {/* <span className="form__input-error error error_profile">Какая-то ошибка при редактировании имени пользователя</span> */}
        <label className="form__input">
          <span className="form__input-label label label_profile">E-mail</span>
          <input
            className="form__input-text form__input-text_last input-text input-text_align_right"
            name="email"
            id="email"
            value={formValue.email}
            onChange={handleChange}
            disabled={!formEdit}
            required="true"
            placeholder="Укажите адрес электронной почты"
            // disabled="true"
            />
        </label>
      </form>
      <div className="form__container">
        <button type="submit"
          form="form__edit-profile"
          name="Save"
          className={`form__button form__button_submit button ${!formEdit && 'button_hidden'}`}
          // className={`profile__button profile__button_submit button ${!formEdit && 'button_hidden'}`}
          disabled={!formEdit}
          >Сохранить изменения</button>

        <button type="button"
          name="Edit"
          className={`profile__button profile__button_edit button`}
          // disabled={formEdit}
          onClick={handleEditForm}
          >{!formEdit ? "Редактировать" : "Отменить редактирование"}</button>

        <button type="button"
          name="LogOut"
          className="profile__button profile__button_logout button"
          >Выйти из аккаунта</button>
      </div>

      {/* {formEdit === false &&
        (<button type="button" name="Edit" className="profile__button profile__button_edit button" onClick={handleEditForm}>Редактировать</button>)
      } */}
      {/* <button type="button" name="LogOut" className="profile__button profile__button_logout button">Выйти из аккаунта</button> */}
    </main>
  );
}

export default Profile;
