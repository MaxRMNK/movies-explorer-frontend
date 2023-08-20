import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item"><a href="/" className="portfolio__link link">Статичный сайт</a></li>
        <li className="portfolio__item"><a href="/" className="portfolio__link link">Адаптивный сайт</a></li>
        <li className="portfolio__item"><a href="/" className="portfolio__link link">Одностраничное приложение</a></li>
      </ul>
    </section>
  );
}

export default Portfolio;
