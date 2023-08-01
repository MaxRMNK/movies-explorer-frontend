// import logo from '../../images/logo.svg';
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__about">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__secondary">
        <nav className="footer__nav">
          <ul className="footer__nav-list">
            <li className="footer__nav-item">
              <a href="https://practicum.yandex.ru/" className="footer__nav-link" target="_blank" rel="noreferrer noopener">Яндекс.Практикум</a>
            </li>
            <li className="footer__nav-item">
              <a href="https://github.com/" className="footer__nav-link" target="_blank" rel="noreferrer noopener">Github</a>
            </li>
          </ul>
        </nav>
        <p className="footer__copy">&copy; {year}</p>
      </div>
    </footer>
  );
}

export default Footer;
