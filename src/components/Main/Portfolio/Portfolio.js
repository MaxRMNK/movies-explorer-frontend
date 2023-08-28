import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a href="https://github.com/MaxRMNK/how-to-learn"
          target="_blank"
          className="portfolio__link link"
          rel="noreferrer noopener"
          >
            Статичный сайт
          </a></li>
        <li className="portfolio__item"><a href="https://maxrmnk.github.io/russian-travel/"
          target="_blank"
          className="portfolio__link link"
          rel="noreferrer noopener"
          >
            Адаптивный сайт
          </a></li>
        <li className="portfolio__item"><a href="https://maxrmnk.github.io/"
          target="_blank"
          className="portfolio__link link"
          rel="noreferrer noopener"
          >
            Одностраничное приложение
          </a></li>
      </ul>
    </section>
  );
}

export default Portfolio;
