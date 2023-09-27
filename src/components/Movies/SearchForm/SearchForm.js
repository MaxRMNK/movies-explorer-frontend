import React from "react";

// import { MESSAGES } from "../../../utils/constants";

import './SearchForm.css';

function SearchForm({
  page,
  handleSearch,
  searchQuery, setSearchQuery,
}) {

  const [ text, setText ] = React.useState( searchQuery.text || '' );
  const [ checkbox, setCheckbox ] = React.useState( searchQuery.checkbox || false );

  // При клике по кнопку Поиск: Отправляется форма и:
  // Устанавливаются предыдущее значение чекбокса и текущее значение инпута
  function handleSubmit(evt) {
    evt.preventDefault();

    // Не нужно - Обновляю стейт запроса в handleSearch App.js
    setSearchQuery({ text, checkbox });
    handleSearch({ text, checkbox });
  }

  const handleChangeInput = (evt) => { // Строка
    const input = evt.target.value;

    setText( input );
    // setSearchQuery({ ...searchQuery, text: input });
  }

  // При клике по Чекбоксу Отправляется форма и:
  // Сбрасываются несохраненные введенные значения инпута -
  // Передаются предыдущие значения инпута и текущее значение чекбокса
  function handleChangeCheckbox(evt) {
    const toggle = evt.target.checked;

    setCheckbox( toggle );
    setText( searchQuery.text );

    // Не нужно - Обновляю стейт запроса в handleSearch App.js
    // Без этого костыля через setCheckbox не успевает сохраниться правильное значение чекбокса в searchQuery
    if (searchQuery.text !== '') {
      setSearchQuery({ ...searchQuery, checkbox: toggle });
    }

    handleSearch({ ...searchQuery, checkbox: toggle });
    // setSearchQuery({ ...searchQuery, checkbox: toggle });
  }

  // Сбрасывает форму поиска при клике по ссылке в меню или переходе на страницу
  React.useEffect(() => {
    // console.log( 'useEffect searchQuery', searchQuery );
    if (page === 'saved-movies') {
      setText('');
      setCheckbox(false);
      setSearchQuery({ text: '', checkbox: false, });
    }
  }, [page, setSearchQuery]);


  return (
    <section className="search">
      <form action="#" className="search__form" onSubmit={handleSubmit} noValidate>
        <div className="search__container">

          <div className="search__container-input">
            <input
              className="search__input"
              id="search"
              name="search"
              type="text"
              placeholder="Фильм"
              // minLength="1"
              maxLength="200"
              // spellCheck="true" // Проверка орфографии
              value={text}
              onChange={handleChangeInput}
            />
            <button type="submit" name="Search" className="search__button button" />
          </div>

          <div className="search__container-toggle">
            <label className="search__label">
              <input
                className="search__checkbox"
                id="checkbox"
                name="checkbox"
                type="checkbox"
                placeholder="Короткометражки"
                checked={checkbox}
                onChange={handleChangeCheckbox}
              />
              <div className="search__toggle"></div>
              <span className="search__toggle-label">Короткометражки</span>
            </label>
          </div>

        </div>
      </form>
    </section>
  );
}

export default SearchForm;
