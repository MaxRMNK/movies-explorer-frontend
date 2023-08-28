import { useState } from 'react';
import { NavLink, Link } from "react-router-dom"; // Routes, Route,

import Logo from "./Logo/Logo";
import './Header.css';

function Header( {isLoggedIn, pathName} ) {
  // console.log('isLoggedIn', isLoggedIn);

  // const location = useLocation().pathname;
  // console.log(pathName);

  const [btnStatus, setBtnStatus] = useState(false);

  const togleBtn = () => {
    setBtnStatus(formEdit => !formEdit);
  }

  /**
   * Для главной: Лого + Регистрация + Вход
   * Для Вход и Регистрация: только Лого (+ изменить отступы у хэадера)
   * Для Фильмов, Сохраненок и Аккаунта: Фильмы + Сохраненки + Аккаунт
   * Для остальных (404): Ничего
   */

  return (
    // <header className={`header ${pathName !== '' ? ('header__'+pathName) : ''} ${isLoggedIn ? 'header_logged' : ''}`}>
    <header className={`header ${pathName !== '' ? ('header_'+pathName) : ''}`}>
      {/* <Link to="/" className="header__link-logo"><div className="header__logo"></div></Link> */}
      <Logo />

      {/* Убирается меню для страниц "Регистрация" и "Вход" */}
      {pathName === 'signin' || pathName === 'signup' ? '' : (<>

        { pathName === '' ? ( /* Меню для главной страницы (для неавторизованных пользователей) */

          <nav className="header__nav nav">
            <ul className="nav__list">
              <li className="nav__item"><Link to="/signup" className="nav__link link">Регистрация</Link></li>
              <li className="nav__item"><Link to="/signin" className="nav__link-login link">Войти</Link></li>
            </ul>
          </nav>

        ) : ( /* Меню для остальных страниц (для авторизованных пользователей) */

          <>
          <button
            className="header__burger-button button"
            type="button"
            arial-label="Меню"
            onClick={togleBtn}
          />

          <nav className={`header__nav header__nav_auth nav ${btnStatus ? 'nav_open' : ''}`}>

            <button
              className="nav__close-button button"
              type="button"
              arial-label="Закрыть меню"
              onClick={togleBtn}
            />

            <ul className="nav__list nav__list_auth">
            {/* <ul className={`nav__list ${btnStatus ? 'nav__list_open' : ''}`}> */}
              <li className="nav__item nav__item_auth nav__item_hide-full-screen"><NavLink
                to="/"
                className={({isActive}) => `nav__link link ${isActive ? 'nav__link_active' : ''}`}
                >Главная</NavLink></li>
              <li className="nav__item nav__item_auth"><NavLink
                to="/movies"
                className={({isActive}) => `nav__link link ${isActive ? 'nav__link_active' : ''}`}
                >Фильмы</NavLink></li>
              <li className="nav__item nav__item_auth"><NavLink
                to="/saved-movies"
                className={({isActive}) => `nav__link link ${isActive ? 'nav__link_active' : ''}`}
                >Сохраненные фильмы</NavLink></li>
              <li className="nav__item nav__item_auth nav__item_profile"><NavLink
                to="/profile"
                className={({isActive}) => `nav__link-profile link ${isActive ? 'nav__link-profile_active' : ''}`}
                >Аккаунт</NavLink></li>
            </ul>

          </nav>
          </>

        )}

      </>)}
    </header>
  );
}

export default Header;
