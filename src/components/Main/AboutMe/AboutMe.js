import './AboutMe.css';
import photo from '../../../images/533cb850b1d1379bbf40c39ff7e31602.jpg'

function AboutMe() {
  return (
    <section id="about-me" className="about-me">
      <h2 className="main-page__title">Студент</h2>
      <div className="about-me__main-container">
        <div className="about-me__content">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__info">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ.
            У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
            начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <p className="about-me__link-list">
            <a href="https://github.com/MaxRMNK/"
              target="_blank"
              className="about-me__link link"
              rel="noreferrer noopener"
              >
                Github
              </a>
            </p>
          {/* <ul>
            <li>Github</li>
            <li>GitLab</li>
            <li>Bitbucket</li>
            <li>Linkedin</li>
            <li>HeadHunter</li>
            <li>Stack Overflow</li>
          </ul> */}
        </div>
        <img src={photo} className="about-me__photo" alt="Мое фото" />
      </div>
    </section>
  );
}

export default AboutMe;
