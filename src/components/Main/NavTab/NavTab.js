import './NavTab.css';

function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__list">
        <li className="nav-tab__item"><a href="#project" className="nav-tab__link link">О проекте</a></li>
        <li className="nav-tab__item"><a href="#techs" className="nav-tab__link link">Технологии</a></li>
        <li className="nav-tab__item"><a href="#about-me" className="nav-tab__link link">Студент</a></li>
      </ul>
    </nav>
  );
}

export default NavTab;
