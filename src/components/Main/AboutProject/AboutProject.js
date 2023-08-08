import './AboutProject.css';

function AboutProject() {
  return (
    <section id="about-project" className="about-project">
      <h2 className="main-page__title">О проекте</h2>
      <div className="about-project__container">
        <article className="about-project__content">
          <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article className="about-project__content">
          <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>
      <div className="about-project__timeline">
        <div className="about-project__time-section about-project__time-section_first">
          <div className="about-project__duration about-project__duration_blue">1 неделя</div>
          <p className="about-project__caption">Back-end</p>
        </div>
        <div className="about-project__time-section about-project__time-section_second">
          <div className="about-project__duration about-project__duration_grey">4 недели</div>
          <p className="about-project__caption">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
