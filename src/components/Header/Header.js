import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from "react-router-dom"; // Routes, Route, useLocation,

import Logo from "./Logo/Logo";
import './Header.css';

function Header({ isLoggedIn, ...props }) {
  // console.log('isLoggedIn', isLoggedIn);
  // console.log('props', props);

  const location = useLocation().pathname.substring(1);
  // const pathName = location.substring(1);
  // console.log('pathName', pathName);


  const [btnStatus, setBtnStatus] = useState(false);

  const togleBtn = () => {
    setBtnStatus(formEdit => !formEdit);
  }

  // Без этого, на планшетах и телефонах не закрывалось мобильное меню при переходе по страницам
  // --
  // Вместо принудительного сброса для перехода по внутренним страницам, наверное, правильнее
  // было бы использовать Link, а не NavLink.
  useEffect(() => {
    setBtnStatus(false);
  }, [location]);


  return (
    // <header className={`header ${pathName !== '' ? ('header__'+pathName) : ''} ${isLoggedIn ? 'header_logged' : ''}`}>
    // <header className={`header ${pathName !== '' ? ('header_'+pathName) : ''}`}>
    <header className="header">
      {/* <Link to="/" className="header__link-logo"><div className="header__logo"></div></Link> */}
      <Logo />

      { !isLoggedIn ? ( /* Меню для неавторизованных пользователей - для главной страницы */

        <nav className="header__nav nav">
          <ul className="nav__list">
            <li className="nav__item"><Link to="/signup" className="nav__link link">Регистрация</Link></li>
            <li className="nav__item"><Link to="/signin" className="nav__link-login link">Войти</Link></li>
          </ul>
        </nav>

      ) : ( /* Меню для авторизованных пользователей */

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
              onClick={props?.onResetFilter}
              className={({isActive}) => `nav__link link ${isActive ? 'nav__link_active' : ''}`}
              >Сохранённые фильмы</NavLink></li>
            <li className="nav__item nav__item_auth nav__item_profile"><NavLink
              to="/profile"
              className={({isActive}) => `nav__link-profile link ${isActive ? 'nav__link-profile_active' : ''}`}
              >Аккаунт</NavLink></li>
          </ul>

        </nav>
        </>

      )}

    </header>
  );
}

export default Header;
