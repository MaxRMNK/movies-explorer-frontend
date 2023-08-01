import { Link } from "react-router-dom"; // Routes, Route,

import './Header.css';

function Header() {
  return (
    <header className="header">
      {/* <a href="/" className="header__link-logo"><div className="header__logo"><img src="{logo}" alt="" /></div></a> */}
      <Link to="/" className="header__link-logo"><div className="header__logo"></div></Link>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item"><a href="/" className="header__nav-link link">Регистрация</a></li>
          <li className="header__nav-item"><button className="header__button_login button">Войти</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
