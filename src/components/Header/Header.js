import { NavLink, Link, useLocation } from "react-router-dom"; // Routes, Route,

import './Header.css';

function Header( {isLoggedIn} ) {
  console.log('isLoggedIn', isLoggedIn);

  const location = useLocation().pathname;
  // console.log(location);

  /**
   * Для главной: Лого + Регистрация + Вход
   * Для Вход и Регистрация: только Лого (+ изменить отступы у хэадера)
   * Для Фильмов, Сохраненок и Аккаунта: Фильмы + Сохраненки + Аккаунт
   * Для остальных (404): Ничего
   */

  return (
    <header className={`header ${isLoggedIn ? 'header_logged' : ''}`}>
      <Link to="/" className="header__link-logo"><div className="header__logo"></div></Link>

      {/* Убирается меню для страниц "Регистрация" и "Вход" */}
      {location === '/signin' || location === '/signup' ? '' : (<>

        { location === '/' ? ( /* Меню для главной страницы */

          <nav className="header__nav nav nav_main">
            <ul className="nav__list">
              <li className="nav__item"><Link to="/signup" className="nav__link link">Регистрация</Link></li>
              <li className="nav__item"><Link to="/signin" className="nav__link-login link">Войти</Link></li>
            </ul>
          </nav>

        ) : ( /* Меню для остальных страниц */

          <nav className="header__nav nav nav_pages">
            <ul className="nav__list">
              {/* <li className="nav__item"><NavLink to="/" className="nav__link link">Главная</NavLink></li> */}
              <li className="nav__item"><NavLink to="/movies" className={({isActive}) => `nav__link link ${isActive ? "nav__link_active" : ""}`}>Фильмы</NavLink></li>
              <li className="nav__item"><NavLink to="/saved-movies" className={({isActive}) => `nav__link link ${isActive ? "nav__link_active" : ""}`}>Сохраненные фильмы</NavLink></li>
              <li className="nav__item"><NavLink to="/profile" className={({isActive}) => `nav__link-profile link ${isActive ? "nav__link-profile_active" : ""}`}>Аккаунт</NavLink></li>
            </ul>
          </nav>

        )}

      </>)}
    </header>
  );
}

export default Header;
