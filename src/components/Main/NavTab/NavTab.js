import './NavTab.css';

function NavTab() {
  return (
    <nav className="promo__nav-tab">
      <ul className="promo__nav-list">
        <li className="promo__nav-item"><a href="/" className="promo__nav-link">О проекте</a></li>
        <li className="promo__nav-item"><a href="/" className="promo__nav-link">Технологии</a></li>
        <li className="promo__nav-item"><a href="/" className="promo__nav-link">Студент</a></li>
      </ul>
    </nav>
  );
}

export default NavTab;
